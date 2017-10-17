# Automagic

This was a full-stack application created to automate data-entry-type processes for Hudson Legal Group. After I handed this code to the company, development migrated away from this repository, but I am keeping it here for display purposes. This code is hosted on Heroku, so you can [tour the old interface](https://automagic-legacy.herokuapp.com/).

This version of the app consisted of a front-end in Angular 2, a server in Node.js (Express.js) and a MongoDB database. The version hosted at the link above is non-functional, displaying only the user interface.

## What does it do?

The primary purpose of this app was to minimize dull, repetitive work and improve efficiency. Using this application, a writer could accomplish ~30-60 minutes of work in about 5 minutes. In short, the app created a database, allowed users to query that database, and then returned pre-formatted text according to company business logic that writers could copy and paste directly into their documents. This process was divided into _________

### Gathering data

On the backend, the app used a web crawler to gather information and include relevant entries into its own database. Additional information was parsed from spreadsheets and included with these entries. There was also a second web crawler that scanned a client's profile and obtained all of their publication information. Writers supplied the URL of this profile as the first step of their process. There were also forms for searching for individual journal titles and adding these entries to the database.

### Returning Results

After gathering data from the client's profile, this information was compared against the database entries. Relevant information was returned to the Angular interface for user confirmation. Users could make modifications as necessary and re-send queries to the database. Users with write privileges on the database (the app offered a simple log-in) could change database entries if any inconsistencies between sources were noticed.

### Payload

Writers were required to provide "evidence" of all the information gathered. The application used a module based on Phantom.js to convert the relevant websites into PDFs, give each file an appropriate name, and then collect those files into a single zip file for the user to download.

Likewise, the application presented formatted text that writers could copy and paste directly into their documents. 

### Administration

This version of the application also included a password-protected administration panel where admin were given simple, user-friendly tools to maintain the database and grant users write privileges to the database.

## Dependecies

Many thanks to:

+ [tinyreq](https://www.npmjs.com/package/tinyreq) -- Used for web crawlers
+ [jszip](https://www.npmjs.com/package/jszip) -- Used to zip PDFs
+ [html-pdf](https://www.npmjs.com/package/html-pdf) -- used to convert html into pdf
+ [@angular/cli](https://www.npmjs.com/package/@angular/cli) --Angular CLI, obviously