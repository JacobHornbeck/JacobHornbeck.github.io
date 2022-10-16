/**
 * Build a DOM element of a given type
 * @param {string} type type of element to create
 * @returns DOM element created of given type
 */
function Build(type) {
    return $(document.createElement(type))
}

/**
 * Randomly adjust timeout to load
 * @param {function} cb Callback function
 * @param {number} bwt Base Wait Time
 * @param {number} art Additional Random Time
 */
function StaggerLoad(cb, bwt = 1000, art = 500) {
    setTimeout(cb, bwt+Math.random()*500);
}

const NO_IMAGE = 'https://dummyimage.com/500x281?text=%20%20%20No%20Image%20%20%20'
const NOT_FOUND = 'https://dummyimage.com/500x281?text=Image%20Not%20Found'

class Project {
    constructor(title = 'Project Title',
                description = 'Project Description',
                technologies = [],
                languages = [],
                imageUrl = '',
                hostedLink) {
        this.title = title
        this.desc = description
        this.tech = technologies
        this.lang = languages
        this.img = imageUrl
        this.link = hostedLink
    }

    get projectElement() {
        let image = Build('img').attr('data-src', this.img)
                                .attr('src', 'loading.gif')
                                .attr('alt', this.title)
        let title = Build('h3').html(this.title)
        if (this.link) {
            var icon = Build('span').addClass('material-symbols-outlined')
                                    .text('open_in_new')
            var link = Build('a').attr('href', this.link)
                                 .attr('target', '_blank')
                                 .append(title)
                                 .append(icon)
        }
        let description = Build('span').html(`<b>Description:</b> ${this.desc}`)
        let project = Build('div').addClass('project')
                                  .append(this.link ? link : title)
                                  .append(image)
                                  .append(description)

        return project
    }
}

const technologies = [
    'backend',
    'frontend',
    'full-stack',
    'web-development',
    'software-development',
    'no-sql-database',
    'sql-database',
    'realtime-database',
]
const languages = [
    'html',
    'css/scss',
    'javascript',
    'nodejs',
    'expressjs',
    'ejs',
    'mongodb',
]

const projects = [
    new Project(
        'Genius Coding',
        'A programming help website that I built for my Senior Project at BYU-Idaho',
        [
            'backend',
            'frontend',
            'full-stack',
            'web-development',
            'no-sql-database',
        ],
        [
            'html',
            'scss',
            'javascript',
            'nodejs',
            'expressjs',
            'ejs',
            'mongodb',
        ],
        'genius-coding.jpg',
        'https://genius-coding.herokuapp.com/'
    ),
    new Project(
        'CMS App',
        'A content management app for documents, messages, and contacts made as a project in WDD 430',
        [
            'backend',
            'frontend',
            'full-stack',
            'web-development',
            'no-sql-database',
            'angular framework',
        ],
        [
            'html',
            'css',
            'typescript',
        ],
        'cms-app.jpg'
    ),
    new Project(
        'Rubik\'s Cube Timer',
        'An Angular app for timing Rubik\'s cube solve times. Built for the final project in WDD 430',
        [
            'backend',
            'frontend',
            'full-stack',
            'web-development',
            'no-sql-database',
            'angular framework',
        ],
        [
            'html',
            'css',
            'typescript',
        ],
        'rubiks-timer-app.jpg'
    ),
    new Project(
        'GitHub Pages',
        'Many projects that I made, either for a class or for a side-project',
        [
            'frontend',
            'web-development',
        ],
        [
            'html',
            'javascript',
            'css',
        ],
        '',
        'https://jacobhornbeck.github.io/'
    )
]

if (projects.length > 0)
    $('.project-flex-grid').html("")

for (let i in projects) {
    $('.project-flex-grid').append(projects[i].projectElement)
}


$('img[data-src]').each(function() {
    if ($(this).data('src').length == 0) {
        StaggerLoad(() => {
            $(this).attr('src', NO_IMAGE)
        })
    }
    else if ($(this).data('src')) {
        $(this).load($(this).data('src'), (res, status, xhr) => {
            if (status != "error") {
                StaggerLoad(() => {
                    $(this).attr('src', $(this).data('src'))
                })
            }
            else {
                StaggerLoad(() => {
                    $(this).attr('src', NOT_FOUND)
                })
            }
        })
    }
})
