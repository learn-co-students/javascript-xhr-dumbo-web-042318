// function getRepositories() {
//   const req = new XMLHttpRequest()
//   req.open("GET", 'https://api.github.com/users/octocat/repos')
//   req.send()
// }

// function showRepositories(event, data) {
//   //this is set to the XMLHttpRequest object that fired the event
//   console.log(this.responseText)
// }

// function showRepositories(event, data) {
//   console.log(this.responseText)
//   let repoList = "<ul>"
//   for(var i=0;i < this.responseText.length; i++) {
//     repoList += "<li>" + this.responseText[i]["name"] + "</li>"
//   }
//   repoList += "</ul>"
//   document.getElementById("repositories").innerHTML = repoList
// }

// function showRepositories(event, data) {
//   var repos = JSON.parse(this.responseText)
//   console.log(repos)
//   const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
//   document.getElementById("repositories").innerHTML = repoList
// }

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}
