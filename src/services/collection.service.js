handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const body = JSON.stringify({
        title: data.get('title'),
        content: data.get('content'),
    });

    const headers = {
        'content-type': 'application/json',
        accept: 'application/json',
    };

    if (data.get('id')) {
        await fetch(`/posts/${data.get('id')}`, {
            method: 'PUT',
            headers,
            body,
        });
    } else {
        await fetch('/posts', {
            method: 'POST',
            headers,
            body,
        });
    }
    await this.getPosts();
}

