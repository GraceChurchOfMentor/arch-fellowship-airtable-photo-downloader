# Arch Fellowship Airtable Photo Downloader
Download directory photos from the Arch Fellowship Airtable base for use in a
data merge or mail merge.

## Usage

### Step 0. Install ImageMagick
Photo conversion depends on ImageMagick to be installed on your system. While
the process to install ImageMagick is system-specific, this command should take
care of it on MacOS:
```
$ brew install imagemagick
```

### Step 1. Clone the repo
```
$ git clone https://github.com/GraceChurchOfMentor/arch-fellowship-airtable-photo-downloader.git
```

### Step 2. Install dependencies
```
$ cd arch-fellowship-airtable-photo-downloader
$ npm install
```

### Step 3. Copy .env file
```
$ cp .env.example .env
```

### Step 4. Edit .env file
```
$ vim .env
```

The comments in the .env file should help you get set up. See the Airtable docs
for more info on locating your API key and Base ID.

## Known Bugs
1. *convert-image.js* does not return any result, and the progress bar UI does
not acknowledge the conversion step. Thus, the script usually terminates before
the progress bar registers completion of the last item.