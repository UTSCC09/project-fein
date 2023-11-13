async function send(method, url, data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: (data) ? JSON.stringify(data) : null,
    })
    //console.log(res);
    if (!res.ok) {
        return await res.text();
    }
    return res.json();
}

export function getUsername() {
    return document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );
}

export async function addUser(username, password) {
    return await send("POST", "/api/signup/", { username: username, password: password });
}

export async function signin(username, password) {
    return await send("POST", "/api/signin/", { username: username, password: password });

}

export async function signout() {
    return await send("GET", "/api/signout/");

}

export async function supportedStocks() {
    return await send("GET", "/api/supported_stock/");
}

export async function companyProfile(symbol) {
    return await send("GET", "/api/company_profile/" + symbol + "/");
}

export async function companyPrice(symbol) {
    return await send("GET", "/api/price/" + symbol + "/");
}

export async function companyCandle(symbol, resolution, from, to) {
    return await send("GET", "/api/candle/" + symbol + "/" + resolution + "/" + from + "/" + to + "/");
}
