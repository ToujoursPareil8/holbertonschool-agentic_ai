# Tasks JSON Reader

This project watches a JSON file named `tasks.json` every 5 seconds and prints the first pending task action to stdout.

## How it works

- Reads the file immediately when the service starts.
- Scans the JSON array in order and selects the first item whose `status` is exactly `pending`.
- Writes the selected `action` to stdout.
- Logs diagnostic information to stderr.
- Re-runs the check every 5 seconds without overlapping loops.

## Run locally

```bash
node app.js
```

If you want to point to a different file:

```bash
env TASKS_FILE_PATH=/path/to/tasks.json node app.js
```

## Build and run with Docker

```bash
docker build -t tasks-json-reader .
docker run --rm \
  -v "$(pwd)/tasks.json:/app/tasks.json:ro" \
  tasks-json-reader
```

Or with Docker Compose:

```bash
docker compose up --build
```

The Compose file mounts `./tasks.json` as read-only so the service never mutates the input file.

## Testing

```bash
npm test
```
