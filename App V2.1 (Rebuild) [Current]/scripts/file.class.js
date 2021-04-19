// Export class from file to be imported by file.js
export default class File {
    // Initialise list for holding active file objects. Variable belongs to class not object
    static fileArray = [];

    // Constructor function containg default values for new files
    constructor(_title = "Unamed", _type = "Unknown", _content = "none", _desc = "Click here to add a description.") {
        this.setTitle = value => {
            let count = 1;
            let newTitle = value;

            File.fileArray.forEach(file => {
                let fileTitle = file.title;

                if (file.duplicateCount > 0) {
                    fileTitle = fileTitle.replace(`(${file.duplicateCount})`, "");
                }

                if (fileTitle == value) { count += 1; }
            });

            if (count > 1) {
                newTitle = value + `(${count})`;
                this.duplicateCount = count;
            }

            return newTitle
        };

        this.duplicateCount = 0;
        this.title = this.setTitle(_title);
        this.type = _type;
        this.desc = _desc;
    }

    // Template HTML code for creating a sidebar widget
    createNewWidget() {
        $('.file-container').append(`
        <div class="file-widget">
            <div class="widget-content">
                <p class="file-title">${this.title}<span class="file-type"> - ${this.type}</span></p>
                <textarea wrap="hard" class="file-desc" type="text"
                placeholder="${this.desc}"></textarea>
            </div>

            <div class="widget-close">
                <img class="widget-close-icon" draggable="false" src="./images/file_icons/cross.png">
            </div>

            <div class="widget-grabber">
                <img class="widget-grabber-icon" draggable="false" src="./images/file_icons/menuBars.svg">
            </div>
        </div>`);
    }
}











// // When the forEach loop runs the first time
// // it's comparing to the first file, 'title'
// //  which has no number on the end meaning that
// // if(file.title == value) { ... } becomes:

//     if("title" == "title") {}

// // Which evaluates to true so count increments from 1 to 2.
// // However the second time the forEach executes
// // file.title is 'title (2)':

//     if("title" == "title (2)") {}

// // Which returns false so the line:

//     count += 1;

// // never runs, meaning that count stays at the
// // the value of 2, turning the new title into
// // 'title (2)' as well, and the cycle repeats.




















// // Export class from file to be imported by file.js
// export default class File {
//     // Initialise list for holding active file objects. Variable belongs to class not object
//     static fileArray = [];

//     // Constructor function containg default values for new files
//     constructor(_title = "Unamed", _type = "Unknown", _content = "none", _desc = "Click here to add drcesiption.") {
//         // Usabillity feature to add "(number)" to the end of files if there are duplicates
//         this.setTitle = value => {

//             let count = 0;
//             let Title = value;

//             File.fileArray.forEach(file => {
//                 if (file.isDuplicate == true) {
//                     if (file.title.substring(0, file.title.length - 3) == value ||
//                         file.title.substring(0, file.title.length - 4) == value) { count += 1; }
//                 }
//                 else {
//                     if (file.title == value) { count += 1; }
//                 }

//             });

//             if (count > 0) {
//                 this.isDuplicate = true;
//                 Title = value + `(${count})`;
//             }

//             return Title;
//         }

//         this.type = _type;
//         this.desc = _desc;
//         this.title = this.setTitle(_title);
//         this.isDuplicate = false;
//         this.content = _content;        
//         this.id = File.fileArray.length;        
//     }

//     // Template HTML code for creating a sidebar widget
//     createBlankWidget() {       
//         $('.file-container').append(`
//         <div class="file-widget">
//             <div class="file-widget-content" data-identifier=\"${this.id}\">
//                 <p class="file-title" title=\"${this.title} - ${this.type}\"><span class="file-type">${this.title} - </span>${this.type} File</p>
//                 <input class="file-description" type="text" placeholder=\"${this.desc}\"></p>

//                 <div class="file-options">
//                     <button type="button" class="remove" title="Remove file from workspace">
//                         <img class="file-options-icons" src="./images/close.svg"></img></button>
//                     <button type="button" class="settings" title="File Settings">
//                         <img class="file-options-icons" src="./images/settings.svg"></button>
//                 </div>
//             </div>

//             <div class="widget-grabber">
//                 <img src="./images/bars-solid.svg">
//             </div>
//         </div>`);
//     }
// }
