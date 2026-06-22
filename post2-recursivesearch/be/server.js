import express from 'express';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const ROOT_VAULT = './memevault';

function normieDiskSearch(currentPath, keyword) {
  console.log(`scanning: ${keyword} in ${currentPath}`); 
  const entries = fsSync.readdirSync(currentPath); 
  let matches = [];

  for (const entryName of entries) {
    const fullPath = path.join(currentPath, entryName);
    const stat = fsSync.statSync(fullPath); 
    const isMatch = entryName.toLowerCase().includes(keyword.toLowerCase());

    if (stat.isDirectory()) { // checking is it a folder?
      if (isMatch) {
        matches.push({ name: entryName, type: 'folder' });
      }
      // ✅ FIXED: This is now inside the safety brackets of the directory check!
      matches = matches.concat(normieDiskSearch(fullPath, keyword)); 
      
    } else if (stat.isFile() && isMatch) { // checking is it a file
      matches.push({ name: entryName, type: 'file' });
    }
  }
  return matches;
}


async function gigachadDiskSearch(currentPath, keyword) {
    console.log(`scanning: ${keyword} in ${currentPath}`); 
  // 1. NON-BLOCKING & BYPASSES METADATA: 
  // { withFileTypes: true } fetches type information directly from OS kernel cache. 
  // No secondary fs.stat calls needed!
  // direct mamla no more secondary cheecks on it 
  const entries = await fs.readdir(currentPath, { withFileTypes: true });
  let matches = [];
  const subFolderPromises = [];// async code writing , isse pura code will not be blocked for one folder
  // sab ek sath chalenge in a async await concept

  for (const entry of entries) {//for...of loop
    const entryName = entry.name;
    const fullPath = path.join(currentPath, entryName);
    const isMatch = entryName.toLowerCase().includes(keyword.toLowerCase());

    if (entry.isDirectory()) {
      if (isMatch) matches.push({ name: entryName, type: 'folder' });
      // 2. CONCURRENT STREAM PROCESSING: 
      // We don't "await" here! We push the active stream task into a bucket queue.
      subFolderPromises.push(gigachadDiskSearch(fullPath, keyword)); //promises run together, await Promise.all() will wait for all of them to finish
    } else if (entry.isFile() && isMatch) {
      matches.push({ name: entryName, type: 'file' });
    }
  }

  // 3. PARALLEL RESOLUTION: Fires all subfolder scans at the exact same time
  const subFolderResults = await Promise.all(subFolderPromises); 
  return matches.concat(subFolderResults.flat());//romoves nested array
}

app.post('/api/search/normie', (req, res) => {
  const { keyword } = req.body;
  console.log("Received normie search request for keyword:", keyword);
  const t0 = performance.now();
  const results = normieDiskSearch(ROOT_VAULT, keyword || '');
  const t1 = performance.now();
  
  res.json({ results, time: (t1 - t0).toFixed(4) });
});

app.post('/api/search/chad', async (req, res) => {
  const { keyword } = req.body;
  
  const t0 = performance.now();
  const results = await gigachadDiskSearch(ROOT_VAULT, keyword || '');
  const t1 = performance.now();
  
  res.json({ results, time: (t1 - t0).toFixed(4) });
});

app.listen(3000, () => console.log('🔥 Benchmark Server spinning on port 5000'));




// i have a weak point in queryObjects, json , how to expand it , hwo to concat it , basically all the data parsing and all