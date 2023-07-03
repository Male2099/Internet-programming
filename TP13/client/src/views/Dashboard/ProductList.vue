
<style>
.sec-right {
    padding: 1rem;
    height: calc(100% - 2rem);
    width: calc(86% - 2rem);
    border: 2px solid black;
    border-left: none;

    overflow: auto;
}

.box-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: .6rem;
}

.box {
    width: 10rem;
    height: 16rem;
    border: 2px solid black;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 3px 4px hsl(0, 0%, 60%);
}

.box:hover {
    box-shadow: 2px 2px 5px hsl(0, 0%, 0%);
}

.data-wrapper {
    height: 100%;
    /* overflow: auto; */
}

.img-wrap {
    height: 30%;
}

.title {
    padding: .7rem 0 0 0;
    text-align: center;
}

.shop-price {
    height: 55%;
    padding: 0 .3rem 0 .3rem;
    overflow: auto;
    list-style: none;
    margin-top: .4rem;
}

.shop-price li {
    padding: 0;
    display: flex;
    justify-content: space-between;

}



.sec-left {
    border: 2px solid black;
    padding-top: 1rem;

    height: calc(100% - 2rem);
    width: calc(15% - 2rem);
    border: 2px solid black;
    overflow: auto;
}

.ctg-box {}

.ctg-box>:first-child {
    width: 100%;
    display: flex;
    gap: .3rem;

}

.ctg-box ul {
    display: flex;
    flex-direction: column;
    margin-top: .6rem;
    margin-left: 0;
    padding: 0;
    list-style: none;
}

.ctg-box li {
    padding: .2rem 2.2rem
}

.ctg-box li::before {
    content: "- ";
}

.ctg-box li:hover {
    /* border-color:black ; */
    background-color: grey;
}
</style>