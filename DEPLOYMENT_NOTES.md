# Deployment Notes (Vercel + GitHub PR)

If Vercel says deployment failed while the PR shows **"Checks awaiting conflict resolution"**, resolve merge conflicts first.

## Required conflict files for this branch
- `app/create/page.tsx`
- `lib/generateProject.ts`

## Expected final state
- `app/create/page.tsx` should call `generateProjectFromPrompt(prompt)` locally.
- `lib/generateProject.ts` should re-export from `@/lib/mockGenerator`.

After resolving conflicts and pushing, re-run Vercel checks.
