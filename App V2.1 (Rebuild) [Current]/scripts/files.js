// Import external file class
import Widget from "./file.class.js";

$(document).ready(function () {
    var numOfActiveFiles = $(".file-widget").length;
    
    if(numOfActiveFiles != 0) {
        $(".empty-container-placeholder").toggleClass("collapsed")
    }
});

// Add JQueryUI code to enable file widgets to be grabbed
// HANDLE - selects the element which drags the container around
// CONTAINMENT - prevents the file from being dragged outside the file container
// AXIS - locks the file so that it can only be dragged up & down
// STACK - Brings the currently dragged div to the top z-index
$(".file-container").sortable({
    handle: ".widget-grabber",
    containment: ".file-container",
    axis: "y",
    stack: ".file-container div"
});

// Function for generating a new file widget to display in the sidebar
const generateWidget = (title, type, desc) => {
    // Create new file object
    // Widget refers to the keyword by which the file class was imported
    let widget = new Widget(title, type, desc);
    // Call on the file method to create the widgets DOM component
    widget.createNewWidget();
    
    // Push the new widget to the fileArray
    Widget.fileArray.push(widget);
}

$("#blank").on("click", function() {
    generateWidget();
});

$("#system").on("click", function() {
    generateWidget("Test");
});

// // Track number of open files
// var numOfActiveFiles = 0;

// // On DOM creation... 
// $(document).ready(function () {
//     // Generate an empty file
//     generateWidget();
//     // Set initial file as active
//     setActiveFile(0)
// });

// // Listener for import buttons which trigger when new file is initialised
// $('.control').on('click', function () {
//     // If the id of the button clicked is new a blank file is created
//     // otherwise create file based on import data
//     if ($(this).attr('id') === 'new') {
//         generateWidget();
//     } else {
//         // Remove listeners to prevent listener stacking
//         $('#importer').off('change');

//         // Add listener for when file value changes
//         $("#importer").change(function () {
//             // Get and store the new files data
//             var rawFile = $(this).val();
//             var extension = rawFile.split('\.').pop();
//             var fileName = rawFile.split('\\').pop().replace('\.' + extension, '');
//             var fileBlob = this.files[0];

//             // Generate a widget using above data
//             generateWidget(fileName, extension.toUpperCase(), fileBlob);

//             // This sets the file value to blank so the same file can be imported twice.
//             $(this).val('');
//         });
//     }
// });

// // Function for generating a new file widget to display in the sidebar
// const generateWidget = (title, type, desc) => {
//     // Limit maximum number of open files to 16
//     // If there is an attempt to create another widget, log and exit the function with return
//     if (numOfActiveFiles == 16) {
//         console.log("Max file limit reached!");
//         return;
//     }    

//     // Increment active file count
//     numOfActiveFiles += 1;

//     // Create new file object
//     // Widget refers to the keyword by which the file class was imported
//     let widget = new Widget(title, type, desc);
//     // Call on the file method to create the widgets DOM component
//     widget.createNewWidget();

//     // Add relevant listeners.
//     // off() is called to prevent listeners from registering and firing multiple times
//     $('.remove').off().on('click', function () {
//         removeFile($(this))
//     });

//     $('.file-widget-content').off().on('click', function () {
//         setActiveFile($(this).attr('data-identifier'))
//     });
    
//     // Add file to file objects static array
//     Widget.fileArray.push(widget);

//     setActiveFile(widget.id)
// }

// // Sets active widget based on given ID
// const setActiveFile = (widgetID) => {
//     // Find the current active file, and remove its active styling
//     // then add the active stylying to the new file
//     $('.file-container').find('.active').removeClass('active');

//     //Find the file widget which has the FWC class with data-ID widgetID
//     $('.file-container').find(`[data-identifier='${widgetID}']`).parent().addClass('active');

//     // < Save current window here >

//     // Store the active file object
//     var activeFile = Widget.fileArray[widgetID];
    
//     // Load contents of new file
//     loadFileContents(activeFile);
// }

// // Delete given widget
// const removeFile = (removeButton) => {
//     // Decrement active file count
//     numOfActiveFiles -= 1;

//     // Remove the widget from the array (using splice to avoid leaving holes in the array)
//     Widget.fileArray.splice(removeButton.closest('.file-widget-content').attr('data-identifier'), 1, '');
    
//     // Remove the physical HTML widget 
//     removeButton.closest('div.file-widget').remove();
    
//     // Attempt to load the file contents of the first open file, if no other files are open, 
//     // simply clear the media container  
//     try {
//         setActiveFile(Widget.fileArray.findIndex(element => element != ""));
//     } 
//     catch {
//         $('.media-embed-container').html(`<img src=""></img>`);
//     }
    
// }

// IDs need to be adjusted when file is removed OR way of reading target file needs changing
// Load media contents of given file
const loadFileContents = (file) => {
    // Check if the given files constant is of type 'blob' (i.e. it contains file data)
    if (file.content instanceof Blob) {
        // Initialise a new FileReader() (a JS object used for securely reading files)
        var loader = new FileReader();

        // Run when readAs*() is executed
        loader.onload = (e) => {
            // Store the contents of the media (e.g. the actual image)
            var returnedContent = e.target.result;

            // Display media differently depending on type
            // This will want refactoring so it feels more efficient - maybe another function?            
            if (file.type == "MP4") {
                $('.media-embed-container').html(`<video class="media-embed" src=\"${returnedContent}\" controls></video>`);
            } else if (file.type == "TXT") {
                $('.media-embed-container').html(`<textarea class="media-embed" style="background-color:transparent; color:white;">${returnedContent}`);
            } else {
                $('.media-embed-container').html(`<img class="media-embed" src=\"${returnedContent}\"></img>`);
            }
        }

        // File data will need to be read differently depeding if it is text or multimedia
        if (file.type != "TXT") {
            loader.readAsDataURL(file.content)
        } else {
            loader.readAsText(file.content)
        }


    } else {
        // If file.content does not contain file data, the file is assumed to be a blank with no media content
        $('.media-embed-container').html(`<img src=""></img>`);
    }
}

