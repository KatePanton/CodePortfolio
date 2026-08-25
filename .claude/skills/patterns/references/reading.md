# Reading a pattern

1. Open the matched file in `.claude/patterns/`.
2. Follow its structure exactly for the new code — same file layout, same
   naming scheme, same order of concerns — unless the task explicitly calls
   for deviating from it.
3. If the pattern doesn't quite fit (close but not exact), prefer adapting
   it over starting from scratch, and note the deviation in the task's
   `task.md` (the `Patterns` field) so it's visible why the output doesn't
   match the template exactly.
4. If applying the pattern reveals it's out of date (the codebase has moved
   on from what it describes), fix the pattern file itself as part of the
   task rather than silently diverging from it.
