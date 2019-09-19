export const notEmpty = (input) => input && input.length > 0;

export const email = (input) => {
    const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(input).toLowerCase());
};
 
// export const regex = /[`~,<>;':"\\/\\[\]\\|{}()=_+!@#$%^&*\\? ]/;

export const number = (input) => {
    const regex = /^[0-9]*$/;
    return regex.test(String(input).toLowerCase());
};

export const password = (input) => {
    const regex = /^\S*$/;
    return regex.test(String(input).toLowerCase());
};

export const username = (input) => {
    const regex = /[`~,<>;':"\\/\\[\]\\|{}()=+!@#$%^&*\\? ]/;
    return regex.test(String(input).toLowerCase());
};

export const name = (input) => {
    const regex = /[`~,<>;':"\\/\\[\]\\|{}()=_+!@#$%^&*\\?]/;
    return regex.test(String(input).toLowerCase());
};