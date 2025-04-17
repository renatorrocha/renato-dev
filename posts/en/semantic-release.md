---
title: Versioning and Automated Releases
description: How I version my apps with automated releases and changelogs
date: 2025-04-17
---

# What is versioning?

Versioning is the process of assigning version numbers to your code, usually following the `vX.Y.Z` pattern — also known as **SemVer** ([Semantic Versioning](https://semver.org/)).

Each part of the version number means something:

- **Major (`X`)**: increased when breaking changes are introduced that are **not compatible** with previous versions.
- **Minor (`Y`)**: increased when new **backward-compatible features** are added.
- **Patch (`Z`)**: increased when **backward-compatible bug fixes** are made.

This kind of versioning helps clearly communicate the impact of a new release to anyone using your app or library.

# What is a release?

A **release** is a packaged and published version of your project. It usually includes:

- The new version number
- A changelog listing what has changed
- Optionally, binaries, artifacts, or distribution files (depending on the project)
- A commit and a tag in the repository marking that version

In other words: it’s the official delivery of a new version of your code.

# How to generate versioning and releases automatically?

That’s where [**semantic-release**](https://semantic-release.gitbook.io/semantic-release/) comes in — a tool that automates the entire process of:

- Generating and applying version numbers based on commit messages (using conventions like [Conventional Commits](https://www.conventionalcommits.org/))
- Automatically generating changelogs
- Creating and publishing the release (with tag, release message, and even publishing to GitHub/GitLab/NPM/etc.)

All of this without having to manually decide the version number.

> In other words: focus on writing good commit messages, and let semantic-release handle the rest.

# Is it JavaScript-only?

**Not at all!** I’ve tested semantic-release in C# projects and it worked flawlessly. The trick was adding a `package.json` and a `.releaserc.json` to define the scripts and dependencies needed to run semantic-release (though honestly, not all of it might be necessary lol).

Then, I created a GitHub Actions workflow to run the semantic-release script on the desired branch. You can configure it however you want: every commit, after a PR is merged, etc.

> 💡 **Don’t forget** to create a `repository secret` with your **PAT (Personal Access Token)** and enable **Workflow Permissions** in your repo settings, allowing GitHub Actions to read and write to the repo.  
> (I spent waaay too long debugging until I realized I hadn’t enabled that option 😂)

---

In the next post, I might walk through how to set up semantic-release from scratch — whether it’s for a JavaScript, C# project, or even something that doesn’t use Node at all.  
Spoiler: it’s easier than it sounds.
