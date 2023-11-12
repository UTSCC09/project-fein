function send(method, url, data) {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: (data) ? JSON.stringify(data) : null,
    })
        .then(x => x.json())
}

export function addUser(username, password) {
    return send("POST", "/api/signup/", { username: username, password: password });
}

export function signin(username, password) {
    return send("POST", "/api/signin/", { username: username, password: password });

}

export function signout() {
    return send("GET", "/api/signout/");

}

export function supportedStocks() {
    return send("GET", "/api/supported_stock/");
}

export function companyProfile(symbol) {
    return send("GET", "/api/company_profile/" + symbol + "/");
}

export function companyPrice(symbol) {
    return send("GET", "/api/price/" + symbol + "/");
}

export function companyCandle(symbol, resolution, from, to) {
    return send("GET", "/api/price/" + symbol + "/" + resolution + "/" + from + "/" + to + "/");
}
