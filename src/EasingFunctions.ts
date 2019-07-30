export function Linear(a: number){
    return a;
}

export function easeInQuad(a: number){
    return a ** 2;
}

export function easeOutQuad(a: number){
    return -a * (a - 2);
}

export function easeInOutQuad(a: number){
    if (a < 0.5){
        return 2 * a ** 2;
    }else{
        a = a * 2 - 1;
        return -0.5 * (a * (a - 2) - 1);
    }
}

export function easeInCubic(a: number){
    return a ** 3;
}

export function easeOutCubic(a: number){
    return (a - 1) ** 3 + 1;
}

export function easeInOutCubic(a: number){
    a *= 2;
    if (a < 1){
        return 0.5 * a ** 3;
    }else{
        return 0.5 * ((a - 2) ** 3 + 2);
    }
}

export function easeInExpo(a: number){
    if (a === 0){
        return 0;
    }
    return 2 ** (10 * (a - 1));
}

export function easeOutExpo(a: number){
    if (a === 1){
        return 1;
    }
    return -(2 ** (-10 * a)) + 1;
}

export function easeInOutExpo(a: number){
    if (a === 0){
        return 0;
    }else if (a === 1){
        return 1;
    }else{
        a *= 2;
        if (a < 1){
            return 0.5 * 2 ** (10 * (a - 1));
        }else{
            a -= 1;
            return 0.5 * (-1 * (2 ** (-10 * a)) + 2);
        }
    }
}