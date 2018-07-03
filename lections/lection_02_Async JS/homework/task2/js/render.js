data = require('./data.js')

class ViewController  {
    constructor(url) {
        this.url = url;
    }

    getRepos() {
        return data.load(this.url.repos_url)
            .then(repos => this.repos = repos)
    }

    fillHeader() {
    const repoName = document.querySelector(".repo-header a"),
          repoImg  = document.querySelector(".header-logo img");
          repoName.innerHTML = this.url.name;
          repoName.href = this.url.html_url;
          repoImg.src = this.url.avatar_url
    }

    fillTable() {
    const table = document.querySelector(".repo-table");   
          table.innerHTML += 
            this.repos.map(repo=>
                `<tr>
                <td>${repo.name}</td>
                <td>${repo.default_branch}</td>
                <td>${repo.updated_at}</td>
                <td>${repo.language}</td>
                </tr>`    
            ).join('')
    }

    async render() {
        await this.getRepos();
        await this.fillHeader();
        await this.fillTable()
    }
}


module.exports = {
    ViewController
};


