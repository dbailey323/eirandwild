
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
            <a class="nav-link" href="${prefix}aboutme.html">About Me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}ourstory.html">Our Story</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/fitnessclasses/motherhoodclasses.html">Motherhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/fitnessclasses/womanhoodclasses.html">Womanhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/babymassage/babymassage.html">Baby Massage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/personaltraining/personaltraining.html">Personal Training</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}oneoffclasses.html">One Off Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}leicester/doula/doula.html">Doula</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${prefix}reviews.html">Reviews</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="${prefix}contact.html">Contact</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="${prefix}faq.html">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

document.body.insertAdjacentHTML('afterbegin', navBar);
