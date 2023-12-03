async function send(method, url, data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: (data) ? JSON.stringify(data) : null,
        credentials: "include"
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

export async function searchStocks(query) {
    return await send("GET", "/api/search/" + query + "/");
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

export async function companyCandle(symbol, resolution) {
    return await send("GET", "/api/candle/" + symbol + "/" + resolution + "/");
}

export async function getFeinBucks(username) {
    return await send("GET", "/api/fein_bucks/" + username + "/");
}

export async function addFunds(username, add_amount) {
    return await send("PATCH", "/api/add_bucks/", { username: username, add_amount: add_amount });

}

export async function buyStock(username, symbol, amount) {
    return await send("POST", "/api/buy_stock/", { username: username, symbol: symbol, amount: amount });

}

export async function changePrivacy(username, privacy) {
    return await send("PATCH", "/api/change_privacy/", { username: username, privacy: privacy });
}

export async function getPrivacy(username) {
    return await send("GET", "/api/get_privacy/" + username + "/");
}

export async function changeUsername(username, new_username) {
    return await send("PATCH", "/api/change_username/", { username: username, new_username: new_username });
}

export async function changePassword(username, new_password) {
    return await send("PATCH", "/api/change_password/", { username: username, new_password: new_password });
}