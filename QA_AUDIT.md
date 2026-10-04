# Novas audit — 5 October 2026

Result: the checks below pass, but the application is not yet fully production-ready. Passing API tests does not establish that every browser interaction or external integration works.

## Verification

| Check | Result | Scope |
| --- | --- | --- |
| Django test suite | 39 passed | Isolated SQLite database; no production records modified |
| Frontend regression tests | 3 test files passed | Admin payloads/edit state, submission failures, authentication/session checks, project slug mapping, empty lists |
| TypeScript and Vite production build | Passed | One bundle-size warning (~519 kB main JS before gzip) |
| Django model/migration consistency | Passed | `makemigrations --check --dry-run`: no changes detected |
| Python dependency consistency | Passed | `pip check`: no broken requirements |
| Live public list/overview APIs | 9 returned 200 with data envelopes | Catalog, consultancy, projects, sectors, company, banners |
| Live public detail APIs | 54/54 passed | 15 products, 4 vessels, 8 product categories, 10 services, 5 consultancy categories, 6 projects, 6 sectors |
| Live missing-record checks | 7/7 returned 404 | Each public detail API family |
| Live priority ordering | Passed | Product, vessel, project and consultancy lists sorted by priority |
| Live private endpoints | 4/4 returned 401 without credentials | Profile plus RFQ/contact/newsletter inboxes |
| Live frontend routes | 10/10 returned the app shell | HTTP routing only; not browser rendering |
| Django deployment checks | Failed | One email configuration error and six security warnings |

The Django tests cover content creation, reads, updates and deletion for products, vessels, projects and consultancy; metadata creation; duplicate/invalid input; nested specifications; image replacement; priorities; public submissions; private inbox access, search, pagination, state updates and deletion; login/logout; upload authorization and validation. Cloudinary success/failure responses are mocked.

## Fixes made during this audit

- Product and consultancy filters now recompute when API data arrives. Previously they could keep rendering bundled records until the user changed a filter.
- Category, consultancy-category, sector and banner creation now require staff access. Public reads remain available.
- Image uploads now require staff access, valid JPEG/PNG/WebP/GIF content, a maximum size of 10 MB and an approved upload folder. Provider failures cannot report success or expose provider exception details.
- Deployment startup no longer runs `seed_novas_data`. That command overwrites sample records and could undo edits or restore deleted records at every restart. Initial seeding is now an explicit operator action.
- Admin entry verifies the session with the backend. Expired and nonstaff sessions cannot open the dashboard; connection failures show a retry state.
- Project lookup preserves the page slug independently of the reference ID.
- Project RFQ selections now contain a stable identifier and category.

## Remaining issues and limits

1. **Production configuration:** the checked-in Django settings enable DEBUG, use a development secret, allow all hosts/origins, and lack secure-cookie settings. Deployment checks also flag HTTPS/HSTS settings. Configure a private production secret, explicit hosts/origins, DEBUG=False and appropriate proxy/TLS settings. Secret rotation and Railway settings were not changed by this audit.
2. **Email:** the configured mail backend writes to the console. Submission records are saved and available through the admin inbox, but this does not prove email delivery. No automatic inbox notification delivery was verified.
3. **PDF downloads:** product and consultancy detail buttons currently run a timer and alert; they do not generate or retrieve PDFs.
4. **API outage fallback:** public data services may display bundled sample content when the API fails. Such content can differ from admin edits or deleted records.
5. **Public vessels listing:** vessels are shown on the homepage and supported by detail/admin APIs, but the routed Products listing fetches products only. The combined catalogue component is not the routed listing.
6. **Priority ties:** ordering checks confirm lower numbers first. They do not imply automatic renumbering when multiple records share the same priority.
7. **Browser coverage:** no connected browser was available. Responsive layouts, interactive navigation, form clicks and accessibility have not been verified end to end. HTTP app-shell checks are not a substitute.
8. **External/production writes:** no real Cloudinary upload, production login, submission, edit or deletion was performed. These require a controlled staging exercise. Local tests use SQLite, not production PostgreSQL.
9. **Coverage boundaries:** this is a source/API audit with automated regression tests, not exhaustive penetration, load or dependency-vulnerability testing. No application-level rate-limit verification was performed.

## Reproduction

Frontend:

```sh
node --test tests/*.test.cjs
npm run build
```

Backend, using an isolated database and the project virtual environment:

```sh
DATABASE_URL=sqlite:////tmp/novas-audit.sqlite3 python manage.py test --noinput
DATABASE_URL=sqlite:////tmp/novas-audit.sqlite3 python manage.py makemigrations --check --dry-run
python manage.py check --deploy
python -m pip check
```

Live checks were read-only and describe the deployed version at audit time. They do not by themselves prove that newly pushed fixes have deployed.
