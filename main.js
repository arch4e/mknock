function main() {
    create_elements();
    if (window.location.href.includes("/#settings/accounts")) click_mailcheck_btn();
}

function create_elements() {
    try {
        if (document.getElementById('loading').style.display == 'none' &&
            document.getElementsByClassName('mknock-btn') != null) {
            const buttonElm    = document.createElement('button');
            const sidepanelElm = document.querySelector('[role="complementary"]').querySelector('[role="tablist"]');

            buttonElm.classList.add("mknock-btn");
            buttonElm.addEventListener('click', check_ex_mail_box);
            buttonElm.innerText = '↻';
            sidepanelElm.prepend(buttonElm);
        } else {
            throw new Error('Failed to create elements');
        }
    } catch(e) {
        console.error(e);
        setTimeout(create_elements, 1000); // 1sec.
    }
}

function check_ex_mail_box() {
    let gmail_account_setting_url = 'https://mail.google.com/mail/u/0/#settings/accounts';
    let url = location.href;

    // open settings page
    window.location.href = gmail_account_setting_url.replace('mail/u/0/', url.match(/mail\/u\/[0-9]*/g));

    click_mailcheck_btn();
}

function click_mailcheck_btn() {
    let obj = document.evaluate('//span[text() = "メールを今すぐ確認する"]', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let elm;

    // click mail check button
    while (elm = obj.iterateNext()) elm.click();

    // load delay
    if (window.location.href.includes("/#settings/accounts") && elm == null) setTimeout(click_mailcheck_btn, 1000);
}

main()