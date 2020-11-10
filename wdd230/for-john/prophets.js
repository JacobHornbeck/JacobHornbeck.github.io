const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

/**
 * Copy the key/value pairs into new template.
 * @param {*} record 
 */
const buildCardFromTemplate = (record) => {
    const template = document.getElementById("template");

    /** @type {HTMLElement} card */
    const card = template.cloneNode(true);
    card.removeAttribute("id");

    Object.entries(record).forEach(([key, value]) => {
        // TODO: create hyphenated attribute from camel-cased keys.
        [...card.querySelectorAll(`[data-${key}]`)].forEach(
            /** @param {HTMLElement} el */
            el => {
                const attr = el.dataset[key];
                if (attr && el.hasAttribute(attr)) {
                    el.setAttribute(attr, value);
                    if (attr === 'src' && el.nodeName === 'IMG') {
                        // Keep track of images as they load, to trigger alignment.
                        imagePromises.push(
                            new Promise(resolve => el.addEventListener('load', resolve, {
                                once: true
                            })));
                    }
                } else {
                    el.textContent = value;
                }
            }
        );
    });

    template.parentElement.appendChild(card);
}


/**
 * Chunk larger array into sub-arrays.
 * @param {any[]} arr 
 * @param {number} size 
 */
const chunk = (arr, size) => Array.from({
    length: Math.ceil(arr.length / size)
}, (_, i) => arr.slice(i * size, i * size + size));



// List of images to await.
const imagePromises = [];

// Fetch JSON from server and process.
fetch(requestURL)
    .then(response => response.json())
    .then(jsonObject => jsonObject['prophets'].forEach(buildCardFromTemplate))