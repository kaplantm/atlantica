Atlantica RAD React Site Repo


# Example workflow: Adding a page
- Open a plain text editor, like Notepad or TextEdit.
- Write your content using [Markdown](https://guides.github.com/features/mastering-markdown/) (it might be easier to leave this blank for now and edit the content later in github since it has a nice markdown preview)
- Save the file as a markdown `.md` file e.g. `contact.md`
- Open the pages folder in github [public/assets/pages](https://github.com/kaplantm/atlantica/tree/master/public/assets/pages) and click "Upload file"
- To add the page to the navigation bar, edit the [navigation.config](https://github.com/kaplantm/atlantica/blob/master/src/configs/navigation-config.json) e.g. add `{ "title": "Contact Us", "file": "contact" },`

# Example workflow: Updating a page
- Go to the [public/assets/pages](https://github.com/kaplantm/atlantica/tree/master/public/assets/pages) in github and select the file you want to edit.
- Click the "Edit this file" (pencil icon) in the top right. 
- Update the markdown in the file. Note that there is a "preview" option to the see the markdown result.
- When you're done editing, scroll to the bottom and click "Commit change"

# Page content

Stored in the `public/assets/pages` folder

Text files use markdown for formatting [Markdown Guide](https://guides.github.com/features/mastering-markdown/)
HTML can also be used in these files (mixed in with markdown)

Editing files in this folder updates the contents of the RAD Atlantica site

In addition to markdown files, there are a few config files the site uses.

# Configs

### Navigation Config

The navigation-config file controls the navigation bar at the top right of the page.
It holds a list of items in the navigation bar.

For example:

```
{
  "navigation": [
    { "title": "Home", "file": "home" },
    {
      "title": "Donate",
      "route": "https://www.paypal.com/pools/c/8nfrLk8JoJ",
      "type": "external"
    }
  ]
}

```

This will setup a navigation bar with just two items. Items in the navigation bar will appear in the order they are in the list, with the first item in the list being the leftmost navigation link.

The first item:
It will be labelled "Home" and link to a page that shows the contents of the `home.md` file in the `public/assets/pages/` directory.

The second item:
It will be labelled "Donate". `"type": "external"` sets this as an external link to the `route` that is set. All links are assumed to be internal unless specified.

### News Config

The navigation-config holds a list of items on the news page.

For example:

```
{
  "news": [
    {
      "file": "we-moved",
      "published": "3/10/2020",
      "title": "RAD1 Server Reset",
      "type": "notice"
    }
  ]
}

```

This will setup the news page to show one post. The title of the post is RAD1 Server Reset. It will show that it was published 3/10/2020. It will be styled like a notice. (Options for type are: "normal", "notice" and "alert". If left blank, it will be a "normal" post.) This post will display the contents of the `we-moved.md` file in the `public/assets/pages/news/` directory.

News items will appear in the order they are in the list, with the first item in the list being the top most post on the news page.

# Home Config

This file controls what news post, if any, appears above the main content on the home page. This can be used to display urgent alerts (e.g. server sets or downtime).

For example:

```
{
  "home": {
    "hightlightNewsPost": "server-reset"
  }
}

```

This causes the home page to display the contents of the `public/assets/pages/news/server-reset` file above its main content

In contrast to:

```
{
  "home": {
    "hightlightNewsPost": null
  }
}

```

Which will not have a news post about the pages main content.

# Sidebar Config

This file contains sets the list of images that will randomly display to the right of the content. When the site first loads, it picks an image from this list. This list references images files store in teh images folder.

For example:

```
{
  "sidebar": {
    "images": ["pig.svg", "chick.svg"]
  }
}

```

This makes it so the site will either display `public/assets/images/pig.svg` or `public/assets/images/chick.svg` to the right of the site content.
If you always want the same image (instead of randomly changing) only put one image in this list.
