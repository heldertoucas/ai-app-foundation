---
description: Close the active Development Universe session and record canonical history
trigger: /du-close
turbo: true
---
# Workflow: /du-close

Close session and archive executive summary into `06-sessions/`:

```bash
python -m dev.cli session close --summary "$ARG1"
```

// turbo
