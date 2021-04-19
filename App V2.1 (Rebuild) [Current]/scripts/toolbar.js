// Initialised the activeTool as the pen
var activeTool = "pen";

// Set active tool and set toolbar icon to selected style
$(".tool-buttons, .dropdown-buttons").click(function () {
    var clickedTool = $(this)
    var functionCall = null;

    // If the clicked feature was a dropdown or utility, ignore it
    if (clickedTool.hasClass("menu") || clickedTool.hasClass("utility")) {
        return null
    } 
    
    // If the clicked feature wasn't a dropdown menu or utility
    // but is a tool, then alter the styling so that it appears
    // selected. If it is not a tool it is a function and so flag
    // where the function would be called.
    if (clickedTool.hasClass("tool")) {
        clickedTool.siblings(".selected").removeClass("selected");
        clickedTool.addClass("selected");
        activeTool = clickedTool.attr("id");
    } else {
        // Will be replaced by a function call to the relevent
        // paint function when the canvas section is implemented.
        functionCall = clickedTool.attr("id");
    }
    
    // Log the currently selected tool and the
    // current function call if there was one.
    console.log(`
        Active Tool: ${activeTool}
        Function Call: ${functionCall}
    `);
});

// Set draggable element with parameters
$("#toolbar").draggable({ 
    handle: "#draggable"
    // containment: "body"
});

// Detect current toolbar state and toggle accordingly
$("#collapse-button").click(function () {
    // Set a placeholder varibale to hold the jQuery object for the target element
    btns = $("#tool-container")

    // If the toolbar container has the collapsed class, invert this.
    // First remove the collapsing class and then invert the arrow direction
    if (btns.hasClass("collapsed")) {
        btns.removeClass("collapsed"); $(".collapse-arrow").attr("src", "./images/toolbar_icons/arrow-left.png");
    } else {
        btns.addClass("collapsed"); $(".collapse-arrow").attr("src", "./images/toolbar_icons/arrow-right.png");
    }
});

// When the rotate buttons is clicked, toggle the vertical class set on or off
$("#rotate").click(function () {
    $("#toolbar").toggleClass("toolbar-vertical")
    $("#draggable").toggleClass("draggable-vertical")
    $("#draggable-icon").toggleClass("draggable-icon-vertical")
    $("#tool-container").toggleClass("tool-container-vertical")
    $(".tool-buttons").toggleClass("tool-buttons-vertical")
    $(".dropdown").toggleClass("dropdown-vertical")
    $("#pen").toggleClass("pen-vertical")
    $("#collapse-button").toggleClass("collapse-button-vertical")
    $(".collapse-arrow").toggleClass("collapse-arrow-vertical")
});

// Toggle layer icon when layer is switched
$("#switch").click(function () {
    // Toggle a class with a high z-index onto the media container 
    $(".media-container").toggleClass("switch");

    // Siwtch the image on the toolbar
    if ($(this).children().attr("src") == "./images/toolbar_icons/switchUp.png") {
        $(this).children().attr("src", "./images/toolbar_icons/switchDown.png");
    } else {
        $(this).children().attr("src", "./images/toolbar_icons/switchUp.png");
    }
});

// Toggle the visibility of the dropdown menus
$("#shape").click(function () {
    $(".dropdown").toggleClass("collapsed")
});