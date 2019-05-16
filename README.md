[![Netlify Status](https://api.netlify.com/api/v1/badges/5e039406-00ce-4a36-a25e-6ef2eaa73271/deploy-status)](https://app.netlify.com/sites/zealous-booth-c55977/deploys)

## dev start

```sh
npm start
```

## generate id for cards

I'm just using this to generate ids. Still no idea how I could auto insert an id on the cards I'm generating. I'd need some kind of weird trigger onFileCreate or something. Looks like too much work for what is needed.
http://www.shortguid.com/#/guid/uid-64


## Decisions

- Having the cards independent seems like a bad idea, so I'm making them dependent on articles. That way there's no need to manage IDs or learn more links. Every card has an article associated with it. Even if it's a stub.


## Structure


- article 1.md is stored inside folder articles/1.
- the 1-n.md files inside the articles/1 folder are the cards associated with article 1.md.


## Credits

Used this image to create the logo: https://pixabay.com/illustrations/background-abstract-futuristic-1462755/
