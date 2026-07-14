# Course Deadline Tracker

A local browser app for tracking three courses and their assignment, weekly test, and project deadlines.

## Use

Run the shared-data local server from this folder:

```sh
node server.js
```

Then visit `http://localhost:5173`.

## Current features

- Stores three course names and website URLs locally in the browser.
- Tracks the selected UNSW-style term and converts `Week N Friday 12:00 pm` into a real date.
- Adds tasks manually with type, deadline, and completion status.
- Extracts deadlines from pasted text or imported `.txt`, `.csv`, `.html`, and `.htm` files.
- Shows extracted deadlines for checking before adding them to the to-do list.
- Sorts the to-do list by deadline.
- Shows open, overdue, and next-seven-days counts.
- Exports and imports app data as JSON.

## Supported pasted deadline examples

```text
Assignment 1 due 2026-07-12 23:59
Weekly Task 3 closes 12/07/2026 18:00
Project Proposal deadline 15 Aug 2026
Due Date
Week 5 Friday 12:00 pm Sydney Local Time
```

The app stores shared data in `shared-data.json` when served by `server.js`. Devices on the same Wi-Fi can use the Mac's IP address, for example `http://192.168.1.23:5173`, and read/write the same task data.

## Install on phone or iPad

Open the Mac LAN address in Safari, tap Share, then tap Add to Home Screen. The app includes a web app manifest and touch icon so it opens like a small app from the home screen.

On Chrome/Android, open the same address and use Install app or Add to Home screen from the browser menu.

The app does not log in to course websites yet. For login-protected course sites, paste the assessment text or import a saved page/text export.
