<h1 align="center">Host your serverless podcast for free with Astropod.</h1>

---

## Quick deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)][deploy]

- Click this button to copy this project to your own GitHub or GitLab account and deploy your podcast with Netlify with a few clicks. ✨

- Once you’ve got the project set up, you do need to
[activate Netlify Identity in the Netlify UI][identity] and the
[“Git Gateway”][gateway] to allow e-mail/password authentication.

---

## Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                             |
| :----------------- | :------------------------------------------------- |
| `pnpm install`     | Installs dependencies                              |
| `pnpm run dev`     | Starts local dev & Netlify CMS proxy servers       |
| `pnpm run build`   | Build your production site to `./dist/`            |
| `pnpm run preview` | Serve `./dist/` & run the Netlify CMS proxy server |

> These commands are using [`pnpm`][pnpm], but you can choose to use `npm` or `yarn` instead if you prefer.


[integration]: https://github.com/delucis/astro-netlify-cms
[deploy]: https://app.netlify.com/start/deploy?repository=https://github.com/manuelernestog/astropod
[identity]: https://docs.netlify.com/visitor-access/identity/
[gateway]: https://docs.netlify.com/visitor-access/git-gateway/
[pnpm]: https://pnpm.io/