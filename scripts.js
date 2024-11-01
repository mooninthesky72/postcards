


const root = document.documentElement;
const start = Math.round(performance.now());
var time_elapsed = 0;
var seconds_elapsed = 0;

var window_width = window.innerWidth;
var window_height = window.innerHeight;

var postcard_1_state = 0;
var postcard1_rotating = 0;
var postcard_2_state = 0;

const postcard1 = document.getElementById("postcard1");
const postcard1_shadow = document.getElementById("postcard1_shadow");

var is_right = 0;
var is_up = 0;
var to_x = 75;
var to_y = 60;
var mouse_x = 0;
var mouse_y = 0;


// all the functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function test_value(value) {
    document.getElementById("test").innerHTML = value;
};
function change_root_var(var_name, new_value) {
    root.style.setProperty(var_name, new_value);
};
function get_root_var(var_name) {
    return getComputedStyle(root).getPropertyValue(var_name);
}
function onMouseUpdate(e) {
    mouse_x = e.pageX;
    mouse_y = e.pageY;
};
function postcard_rotate_by_mouse() {
    change_root_var("--postcard_1_to_rotate_x", `${String(
        ((  mouse_y - (window_height / 2)  ) / 30) * -1
    )
    }deg`);
    change_root_var("--postcard_1_to_rotate_y", `${String(
        ((  mouse_x - (window_width / 2)  ) / 30) * -1
    )
    }deg`);
};

//

function INIT() { 

    document.addEventListener('mousemove', onMouseUpdate, false);
    document.addEventListener('mouseenter', onMouseUpdate, false);

    change_root_var("--postcard_1_rotate_z", `${String(getRandomInt(-5, 5))}deg`);
    change_root_var("--postcard_2_rotate_z", `${String(getRandomInt(-5, 5))}deg`);

    window.addEventListener("wheel", (e) => {
        change_root_var("--postcard_1_y", `${String(
            parseInt(get_root_var("--postcard_1_y").slice(0, -2)) + (e.deltaY / 40)
        )}vh`)
    });

    postcard1.addEventListener('click', () => {
        if(!postcard_1_state) {
            postcard1.classList.remove("postcard1_not_hover");
            postcard1.classList.add("postcard1_hover");
            postcard1_shadow.classList.remove("postcard1_shadow_not_center");
            postcard1_shadow.classList.add("postcard1_shadow_center");

            postcard1_rotating = setInterval(postcard_rotate_by_mouse, 15);
        }

        else if(postcard_1_state) {
            change_root_var("--postcard_1_rotate_z", `${String(getRandomInt(-5, 5))}deg`);
            postcard1.classList.remove("postcard1_hover");
            postcard1.classList.add("postcard1_not_hover");
            postcard1_shadow.classList.remove("postcard1_shadow_center");
            postcard1_shadow.classList.add("postcard1_shadow_not_center");
            clearInterval(postcard1_rotating);
        }
    });
    postcard1.addEventListener('animationstart', () => {
        if(postcard_1_state == 1) {
            postcard_1_state = 0;
        }
        else {
            postcard_1_state = 1;
        }
    });

}

//

function main() {

    INIT()
    
    setInterval(main_loop, 15);
};

function main_loop() {
    time_elapsed = Math.round(performance.now()) - start;
    seconds_elapsed = String(time_elapsed).slice(0, -3);
};