
const navBar = `
<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="/index.html"><img src="/images/homepageheader.png" alt="logo" style="min-width:200px;" height="100"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
            aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarToggler" style="justify-content: center;">
            <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/aboutme.html">About Me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ourstory.html">Our Story</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/leicester/fitnessclasses/motherhoodclasses.html">Motherhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/leicester/fitnessclasses/womanhoodclasses.html">Womanhood Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/leicester/babymassage/babymassage.html">Baby Massage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/leicester/personaltraining/personaltraining.html">Personal Training</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/oneoffclasses.html">One Off Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/leicester/doula/doula.html">Doula</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/reviews.html">Reviews</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="/contact.html">Contact</a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="/faq.html">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;

// Insert the navbar at the beginning of the body
document.body.insertAdjacentHTML('afterbegin', navBar);
