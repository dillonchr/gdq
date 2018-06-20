![](gdq.gif)
# GDQ Schedule
Cleans up the GDQ schedule and ships it in JSON format.

## Install
`npm i @dillonchr/gdq`

## Usage
Pretty simple. Just run `gdq` and you shall get a response with the full schedule that's currently posted. Dates are handled with `moment` to be localized to my personal timezone. Hahaha. That just sounds ridiculous on an official readme file. What are ya gonna do though?

The result set will be in this format:

```js
[
    {
        start: <date>,
        title: <string>,
        runners: <string>,
        estimate: <string>, //  in hh:mm:ss format
        ends: <date>,
        done: <bool>
    }
]
```