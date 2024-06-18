let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fonName = document.getElementById("fontName");
let fonSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fontlist
let fontList = [
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Unicode MS",
  "Calibri",
  "Cambria",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Courier",
  "Garamond",
  "Georgia",
  "Verdana",
  "Times New Roman",
  "Courier New",
  "Comic Sans MS",
  "Impact",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Microsoft Sans Serif",
  "Segoe UI",
  "Segoe UI Symbol",
  "Segoe Script",
  "Segoe Print",
  "Trebuchet MS",
];

// Initial Settings
const initializer = () => {
  // function calls for highlighting button
  // No highlighting for link, unlink, lists, undo, redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true)
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);


  // create options for font names
  fontList.map(value => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fonName.appendChild(option);
  });

  // fontSize allows only till 20
  for (let i = 1; i <= 20; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSize.appendChild(option);
  }

  // default size
  fonSizeRef.value = 3;
};


// main logic
const modifyText = (command,defaultUi, value) => {
  // execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// options that requires value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  // if link hass http the pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else{
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
})

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      // needsRemoval = true means only one button should be highlighted and others would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        // If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        // Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          // highlight clicked button
          button.classList.add("active");
        }
      }
      else {
        // If other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};


const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer