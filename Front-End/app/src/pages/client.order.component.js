import React from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import Create from '../services/CreatePOForm'
import Order from "../views/order-view.component"
import {Link} from "react-router-dom"
import './animation.css'
export default class OrderListing extends React.Component{

    constructor(){
        super();
        this.state={
            processed:[],
            orders:[],
            pending:[],
            id:''
        }
    }
    componentDidMount() {
        const currentUser = AuthService.fetchCurrentUser();
        var id = null;
        if(currentUser !== null){
            id = currentUser.id;
        }
        this.setState({id:id})
        this.getOrders(id);
    }
    getOrders=(id)=>{
        axios.get(`http://localhost:3000/pos/client/${id}`)
        .then((response)=>{
          this.setState({orders: response.data});
          console.log(response.data)
        })
    }

    render(){
        return(
            <div>
                <h1 style={{marginTop:'70px'}}>Your orders</h1>
               {this.state.orders.length>0 ?(
                    <ul class="list-group">
                        <li class="list-group-item">
                            {this.state.orders.map((order)=>(
                                <Order  id={order.poNo} poPrice={order.poPrice} clientCompId={order.clientCompId} date={order.datePO} status={order.status}/>
                            ))}
                        </li>
                                      
                    </ul>
                ):(
                    <div>
                        <p style={{marginTop:'10px'}}>Empty</p>
                        <p>Login to your account to place an order  <Link to="/login">Login</Link></p>
                        <svg width="300" height="300" viewBox="0 0 798 835" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="undraw_void_3ggu 1" clip-path="url(#clip0)">
                            <g id="circles">
                            <path id="Vector" d="M566.656 598.243C728.578 551.813 822.387 383.556 776.185 222.431C729.983 61.3054 561.266 -31.6732 399.344 14.757C237.423 61.1873 143.614 229.444 189.816 390.569C236.017 551.694 404.735 644.673 566.656 598.243Z" fill="#3F3D56"/>
                            <path id="Vector_2" opacity="0.05" d="M552.061 547.343C685.732 509.013 763.175 370.112 725.034 237.098C686.893 104.084 547.611 27.3272 413.94 65.6569C280.268 103.987 202.826 242.888 240.967 375.902C279.108 508.916 418.39 585.673 552.061 547.343Z" fill="black"/>
                            <path id="Vector_3" opacity="0.05" d="M539.602 503.892C649.157 472.477 712.628 358.636 681.368 249.619C650.108 140.602 535.955 77.6935 426.399 109.108C316.844 140.522 253.373 254.364 284.633 363.381C315.893 472.398 430.046 535.306 539.602 503.892Z" fill="black"/>
                            <path id="Vector_4" opacity="0.05" d="M523.582 448.026C602.132 425.503 647.639 343.88 625.226 265.717C602.813 187.554 520.967 142.45 442.418 164.974C363.869 187.497 318.362 269.12 340.775 347.283C363.187 425.445 445.033 470.55 523.582 448.026Z" fill="white"/>
                            </g>
                            <g id="levitate">
                            <path id="Vector_5" d="M308.5 812.515C478.88 812.515 617 788.114 617 758.015C617 727.915 478.88 703.515 308.5 703.515C138.12 703.515 0 727.915 0 758.015C0 788.114 138.12 812.515 308.5 812.515Z" fill="#3F3D56"/>
                            <path id="Vector_6" d="M197.17 306.497C197.17 306.497 173.466 373.219 184.001 396.923C194.537 420.627 211.217 443.453 211.217 443.453C211.217 443.453 205.072 310.886 197.17 306.497Z" fill="#D0CDE1"/>
                            <path id="Vector_7" opacity="0.1" d="M197.17 306.497C197.17 306.497 173.466 373.219 184.001 396.923C194.537 420.627 211.217 443.453 211.217 443.453C211.217 443.453 205.072 310.886 197.17 306.497Z" fill="black"/>
                            <path id="Vector_8" d="M213.851 461.011C213.851 461.011 212.095 477.692 211.217 478.57C210.339 479.448 212.095 481.204 211.217 483.837C210.339 486.471 209.461 489.983 211.217 490.861C212.973 491.739 201.56 568.996 201.56 568.996C201.56 568.996 173.466 605.869 184.879 663.812L188.391 722.633C188.391 722.633 215.607 724.388 215.607 714.731C215.607 714.731 213.851 703.318 213.851 698.051C213.851 692.783 218.24 692.783 215.607 690.149C212.973 687.516 212.973 685.76 212.973 685.76C212.973 685.76 217.363 682.248 216.485 681.37C215.607 680.492 224.386 618.16 224.386 618.16C224.386 618.16 234.043 608.503 234.043 603.235V597.967C234.043 597.967 238.433 586.554 238.433 585.677C238.433 584.799 262.137 531.245 262.137 531.245L271.794 569.874L282.329 625.183C282.329 625.183 287.596 675.225 298.132 694.539C298.132 694.539 316.568 757.75 316.568 755.994C316.568 754.238 347.295 749.848 346.417 741.947C345.539 734.046 327.981 623.427 327.981 623.427L332.371 459.256L213.851 461.011Z" fill="#2F2E41"/>
                            <path id="Vector_9" d="M190.147 718.243C190.147 718.243 166.443 764.773 182.246 766.529C198.048 768.285 204.194 768.285 211.217 761.261C215.057 757.422 222.832 752.27 229.093 748.388C232.802 746.126 235.799 742.863 237.739 738.975C239.679 735.087 240.484 730.731 240.062 726.407C239.599 722.111 237.994 718.572 234.043 718.243C223.508 717.365 211.217 707.708 211.217 707.708L190.147 718.243Z" fill="#2F2E41"/>
                            <path id="Vector_10" d="M320.957 752.482C320.957 752.482 297.254 799.012 313.056 800.768C328.859 802.524 335.004 802.524 342.028 795.5C345.867 791.661 353.643 786.509 359.903 782.627C363.613 780.365 366.609 777.102 368.549 773.214C370.489 769.326 371.295 764.97 370.872 760.646C370.409 756.35 368.804 752.811 364.854 752.482C354.319 751.604 342.028 741.947 342.028 741.947L320.957 752.482Z" fill="#2F2E41"/>
                            <path id="Vector_11" d="M295.905 230.352C316.287 230.352 332.809 213.829 332.809 193.447C332.809 173.065 316.287 156.542 295.905 156.542C275.523 156.542 259 173.065 259 193.447C259 213.829 275.523 230.352 295.905 230.352Z" fill="#FFB8B8"/>
                            <path id="Vector_12" d="M272.18 205.573C272.18 205.573 245.82 254.076 243.711 254.076C241.602 254.076 291.16 269.892 291.16 269.892C291.16 269.892 304.867 223.498 306.976 219.28L272.18 205.573Z" fill="#FFB8B8"/>
                            <path id="Vector_13" d="M312.617 258.65C312.617 258.65 259.942 229.678 254.674 230.556C249.407 231.434 193.22 280.598 194.098 300.79C194.975 320.982 201.999 354.344 201.999 354.344C201.999 354.344 204.633 447.404 209.9 448.281C215.168 449.159 209.022 464.962 210.778 464.962C212.534 464.962 333.687 464.962 334.565 462.328C335.443 459.694 312.617 258.65 312.617 258.65Z" fill="#D0CDE1"/>
                            <path id="Vector_14" d="M342.028 467.157C342.028 467.157 358.708 518.076 344.661 516.321C330.615 514.565 324.469 472.424 324.469 472.424L342.028 467.157Z" fill="#FFB8B8"/>
                            <path id="Vector_15" d="M297.254 255.577C297.254 255.577 264.77 262.601 270.038 306.497C275.306 350.393 284.963 394.289 284.963 394.289L317.446 465.401L320.958 478.57L344.662 472.424L327.103 370.585C327.103 370.585 320.958 261.723 313.056 258.211C308.074 256.087 302.656 255.184 297.254 255.577V255.577Z" fill="#D0CDE1"/>
                            <path id="Vector_16" opacity="0.1" d="M277.5 392.973L317.885 464.961L283.86 389.104L277.5 392.973Z" fill="black"/>
                            <path id="Vector_17" d="M332.646 182.58L332.768 179.76L338.378 181.157C338.318 180.251 338.062 179.37 337.628 178.573C337.194 177.776 336.592 177.083 335.864 176.541L341.84 176.207C336.826 169.082 330.419 163.046 323.007 158.465C315.595 153.885 307.332 150.854 298.716 149.556C285.79 147.683 271.397 150.394 262.534 159.986C258.234 164.639 255.533 170.557 253.611 176.593C250.072 187.711 249.351 200.965 256.731 210.003C264.232 219.188 277.333 220.987 289.137 222.124C293.29 222.524 297.643 222.896 301.491 221.284C301.92 216.87 301.355 212.415 299.838 208.248C299.206 206.957 298.904 205.531 298.959 204.095C299.483 200.584 304.168 199.699 307.686 200.173C311.205 200.648 315.436 201.374 317.748 198.679C319.341 196.823 319.247 194.12 319.458 191.683C320.033 185.05 332.586 183.971 332.646 182.58Z" fill="#2F2E41"/>
                            <path id="Vector_18" d="M559 765.515C582.748 765.515 602 746.263 602 722.515C602 698.766 582.748 679.515 559 679.515C535.252 679.515 516 698.766 516 722.515C516 746.263 535.252 765.515 559 765.515Z" fill="#6C63FF"/>
                            <path id="Vector_19" d="M54 750.515C77.7482 750.515 97 731.263 97 707.515C97 683.766 77.7482 664.515 54 664.515C30.2518 664.515 11 683.766 11 707.515C11 731.263 30.2518 750.515 54 750.515Z" fill="#6C63FF"/>
                            <path id="Vector_20" d="M54 681.515C71.1208 681.515 85 667.635 85 650.515C85 633.394 71.1208 619.515 54 619.515C36.8792 619.515 23 633.394 23 650.515C23 667.635 36.8792 681.515 54 681.515Z" fill="#6C63FF"/>
                            <path id="Vector_21" d="M54 624.515C66.1503 624.515 76 614.665 76 602.515C76 590.364 66.1503 580.515 54 580.515C41.8497 580.515 32 590.364 32 602.515C32 614.665 41.8497 624.515 54 624.515Z" fill="#6C63FF"/>
                            </g>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="797.5" height="834.5" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                )}
                <Create id={this.state.id}/>
            </div>
           
        );
    }
}
