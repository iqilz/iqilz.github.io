const track = document.getElementById("media-track");
let percentage = -10;

window.onwheel = e => {
    if (window.innerWidth < 768) return;

    const scrollDelta = e.deltaY / 25;
    const nextPercentage = Math.max(Math.min(percentage - scrollDelta, -10), -90);
    
    if (nextPercentage === percentage) return;
    percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const media of track.querySelectorAll(".image")) {
        const parallaxValue = 50 + (nextPercentage + 50) * 0.25;

        media.animate({
            objectPosition: `${parallaxValue}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

var form = document.getElementById("my-form");
    
if (form) {
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form";
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
    }
    form.addEventListener("submit", handleSubmit);
}
