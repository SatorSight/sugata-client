import React from 'react';

export default class Article{
    constructor(id = null, reader = null){
        this.id = id;
        this.reader = reader;
        this.loading = true;
        this.tags = [];
        this.comments = [];
    }

    load = () => {
        this.fetch_data()
            .then(resp => resp.json())
            .then(a => {
                this.assemble(a);
                this.update();
            })
    };

    update = () => this.reader.update();

    fetch_data = () => fetch(`/api/article/article/${this.id}`, {credentials: 'include'});

    assemble = data => {
        this.set_id(data.id);
        this.set_page_number(data.page_number);
        this.set_html(data.html);
        this.set_desktop_html(data.desktop_html);
        this.set_next_article(data.next_article);
        this.set_tags(data.tags);
        this.set_comments(data.comments);
        this.set_loading(false);
    };

    set_id = id => this.id = id;
    get_id = () => this.id;

    set_tags = tags => this.tags = tags;
    get_tags = () => this.tags;

    set_comments = comments => this.comments = comments;
    get_comments = () => this.comments;

    set_next_article = next_article => this.next_article = next_article;
    get_next_article = () => this.next_article;

    set_page_number = page_number => this.page_number = page_number;
    get_page_number = () => this.page_number;

    set_html = html => this.html = html;
    get_html = () => this.html;

    set_desktop_html = html => this.desktop_html = html;
    get_desktop_html = () => this.desktop_html;

    set_loading = loading => this.loading = loading;
    get_loading = () => this.loading;


    render(orientation = 'mobile'){

        let html = '';
        if(orientation === 'mobile')
            html = this.get_html() || this.get_desktop_html();
        else
            html = this.get_desktop_html() || this.get_html();

        return this.get_loading() ? null : <div style={{margin: 20}} dangerouslySetInnerHTML={{ __html: html }} />;
    }
}