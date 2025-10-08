jQuery(document).ready(function($) {

/*    Menu
***************************************************************/

$(document).on('click', '.bookmakers-top__menu-btn', function(e) {
    let menu = document.querySelector(".bookmakers-top__menu");
    if (menu.classList.contains('active')) menu.classList.remove('active');
    else menu.classList.add('active');
});

/*    Update top
***************************************************************/

$(document).on('click', '.js_top-update', function(e) {
    updateTop(e.target);
});
function updateTop(btn) {
    let type = btn.dataset.type;
    let result = '';
    let bookmakersTop = document.getElementsByClassName("bookmakers-top__cards")[0];
    var bookmakersCards = document.querySelectorAll(".bookmaker-card");
    bookmakersCards.forEach((card) => {
        card.classList.add('bookmaker-card--invisible');
    });


    fetch('data.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach((element) => {
            result += cardTemplate(element);
        });
        bookmakersTop.innerHTML = result;
        var bookmakersCards = document.querySelectorAll(".bookmaker-card");
        bookmakersCards.forEach((card) => {
            card.classList.remove('bookmaker-card--invisible');
        });
    })
    .then(() => {
        var bookmakersFilterItems = document.querySelectorAll(".bookmakers-filter__item.active");
        bookmakersFilterItems.forEach((item) => {
            item.classList.remove('active');
        });
        btn.parentNode.classList.add('active');
    });
}
function cardTemplate(element) {
    let template = `<div class="bookmaker-card bookmaker-card--invisible">
                    <div class="bookmaker-card__sect bookmaker-card__logo">
                        <div class="bookmaker-logo">
                            <img class="bookmaker-logo__img" src="` + element.logo + `">
                            <div class="bookmaker-logo__check">
                                <svg class="bookmaker-logo__check-svg" ><use href="assets/img/sprite.svg#check-circle"></use></svg>
                            </div>
                        </div>
                    </div>
                    <div class="bookmaker-card__sect bookmaker-card__rating">
                        <div class="rating">`;
    template += `<svg class="rating__star-svg`
    if (element.rating > .5) template += ` active `;
    template += `"><use href="assets/img/sprite.svg#star"></use></svg>`;
    template += `<svg class="rating__star-svg`
    if (element.rating > 1.5) template += ` active `;
    template += `"><use href="assets/img/sprite.svg#star"></use></svg>`;
    template += `<svg class="rating__star-svg`
    if (element.rating > 2.5) template += ` active `;
    template += `"><use href="assets/img/sprite.svg#star"></use></svg>`;
    template += `<svg class="rating__star-svg`
    if (element.rating > 3.5) template += ` active `;
    template += `"><use href="assets/img/sprite.svg#star"></use></svg>`;
    template += `<svg class="rating__star-svg`
    if (element.rating > 4.5) template += ` active `;
    template += `"><use href="assets/img/sprite.svg#star"></use></svg>`;
    template +=             `<div class="rating__value">` + element.rating + `</div>
                        </div>
                    </div>
                    <div class="bookmaker-card__sect bookmaker-card__comments-count">
                        <div class="comments-count">
                            <svg class="comments-count__icon-svg"><use href="assets/img/sprite.svg#chat"></use></svg>
                            <div class="comments-count__value">
                                ` + element.review_count + `
                            </div>
                        </div>
                    </div>
                    <div class="bookmaker-card__sect bookmaker-card__bonus">
                        <div class="bonus">
                            <div class="bonus__row">
                                <div class="bonus__badge">`;
                                    if (element.badge == 'exclusive') template += ` <div class="badge badge--extra">Эксклюзив</div> `;
                                    else if (element.badge == 'no-deposit') template += ` <div class="badge badge--success">Без депозита</div> `;
                                    else template += ` <div class="badge badge--error">Нет бонуса</div> `;
                                template += `</div>
                            </div>`;
    let bonus = element.bonus_amount / 1000;
    bonus = Math.round(bonus, -2);
    if (bonus > 0) template += `           <div class="bonus__row">
                                <div class="bonus__icon">
                                    <svg class="bonus__icon-svg"><use href="assets/img/sprite.svg#gift"></use></svg>
                                </div>
                                <div class="bonus__value">` + bonus + `K ₽</div>
                            </div>`;
    template += `       </div>
                    </div>
                    <div class="bookmaker-card__sect bookmaker-card__controls">
                        <a class="btn btn--common" href="` + element.internal_link + `">Обзор</a>
                        <a class="btn" href="` + element.external_link + `">Сайт</a>
                    </div>
                </div>`;
    return template;
}









});