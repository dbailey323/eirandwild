
const path = window.location.pathname;
const depth = path.split('/').filter(i => i.length).length - 1;
let prefix = '';
for (let i = 0; i < depth; i++) {
  prefix += '../';
}

const navBar = `
<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="${prefix}index.html"><img src="${prefix}images/homepageheader.png" alt="logo" style="min-width:200px;" height="100"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarToggler" style="justify-content: center;">
            <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="${prefix}aboutme">About Me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}ourstory">Our Story</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/fitnessclasses/motherhoodclasses">Motherhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/fitnessclasses/womanhoodclasses">Womanhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/fitnessclasses/hiit">Online HIIT</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/babymassage/babymassage">Baby Massage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/personaltraining/personaltraining">Personal Training</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}oneoffclasses">One Off Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/doula/doula">Doula</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}reviews">Reviews</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="${prefix}contact">Contact</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="${prefix}faq">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

document.body.insertAdjacentHTML('afterbegin', navBar);
