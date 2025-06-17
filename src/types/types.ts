import Produto from '@/components/Produto/Produto';
import { JwtPayload } from 'jwt-decode'

export interface AuthTokenPayload extends JwtPayload {
    id: number,
    email: string,
    role: |'client'|'admin',
}

export interface User {
    id?:             number;
    firstName?:      string;
    lastName?:       string;
    email:           string;
    birthday?:       Date;
    phone?:          string;
    username?:       string;
    password?:       string;
    address?:        string;
    obs?:            string;
    city?:           string;
    state?:          string;
    postalCode?:     string;
    cardExpire?:     string;
    cardNumber?:     string;
    cardHolderName?: string;
    cardHolderDoc?:  string;
    cardCvv?:        number;
    cardParc?:       number;
    paymentMethod?:  string;
    role:           |'admin' | 'client';
}

export interface Category {
    id:          number;
    description: string;
}


export interface Product {
    id?:                   number;
    title?:                string;
    description?:          string;
    category?:             Category;
    price?:                number;
    discountPercentage?:   number;
    rating?:               number;
    stock?:                number;
    tags?:                 string;
    brand?:                string;
    sku?:                  string;
    weight?:               number;
    dimensions?:           Dimensions;
    warrantyInformation?:  string;
    shippingInformation?:  string;
    availabilityStatus?:   string;
    reviews?:              Review[];
    returnPolicy?:         string;
    minimumOrderQuantity?: number;
    meta?:                 Meta;
    images?:               Image[];
    thumbnail?:            string;
}

export interface ProductDTO{
    idcategory: number;
    width?:  number;
    height?: number;
    depth?:  number;
    createdat?: Date;
    updatedat?: Date;
    barcode?:   string;
    qrcode?:    string;
    id?:        number;
    title?:                string;
    description?:          string;
    price?:                number;
    discountpercentage?:   number;
    rating?:               number;
    stock?:                number;
    brand?:                string;
    sku?:                  string;
    weight?:               number;
    warrantyinformation?:  string;
    shippinginformation?:  string;
    availabilitystatus?:   string;
    returnpolicy?:         string;
    minimumorderquantity?: number;
    thumbnail?:            string;    
}

export interface Dimensions {
    width?:  number;
    height?: number;
    depth?:  number;
}

export interface Meta {
    createdAt?: Date;
    updatedAt?: Date;
    barcode?:   string;
    qrCode?:    string;
}

export interface Review {
    id:          number;
    idProduct: number;
    idOrder:   number;
    rating:        number;
    comment:       string;
    date?:          Date;
    reviewerName?:  string;
    reviewerEmail?: string;
}

export interface ReviewDTO{
    idproduct: number;
    rating:        number;
    comment:       string;
    date?:          Date;
    reviewername?:  string;
    revieweremail?: string;    
}

export interface Image {
    id: number;
    url: string;
}

export interface ImageDTO{
    idproduct: number;
    id: number;
    url: string;
}

export interface ProductCart {
    id: number;
    title: string;
    idProduct: number;
    qtde: number;
    price?: number;
    discountPercentage?: number;
    thumbnail?: string;
}

export interface Order {
    id?: number;
    idUser?: number;
    date?: Date;
    dtprev?: Date;
    products?: OrderProduct[];
    payment?: OrderPayment;
    shipping?: OrderShipping;
    status?: OrderStatus;
}

export type OrderStatus = |'pending'|'paid'|'sent'|'received'|'canceled'|'expired'; 

export type ChStatus = {
    novoStatus: OrderStatus,
    idPedido: number
}

export interface OrderDTO {
    id?: number;
    iduser?: number;
    date?: Date;
    dtprev?: Date;
    status?: OrderStatus;
}

export interface OrderProduct {
    id?: number;
    idProduct: number;
    qtde: number;
    title: string;
    thumbnail?: string;
    price: number;
    discountPercentage?: number;
}

export interface OrderProductDTO {
    idproduct: number;
    qtde: number;
    title: string;
    thumbnail?: string;
    price: number;
    discountpercentage?: number;
}

export interface OrderPayment {
    date?: Date;
    parc?: number;
    value?: number;
    discountPercentage?: number;
    paymentMethod?: string;
    cardExpire?: string,
    cardNumber?: string;
    cardHolderName?: string;
    cardHolderDoc?: string;
    cardCvv?: number;
}

export interface OrderPaymentDTO {
    date?: Date;
    parc?: number;
    value?: number;
    discountpercentage?: number;
    paymentmethod?: string;
    cardexpire?: string,
    cardnumber?: string;
    cardholdername?: string;
    cardholderdoc?: string;
    cardcvv?: number;
}

export interface OrderShipping {
    date?: Date;
    daysprev?: number;
    value?: number;
    address?: string;
    obs?: string;
    city?: string;
    state?: string
    postalCode?: string;
    receivedBy?: string;
    receivedAt?: Date;
    trackingCode?: string;
}
export interface OrderShippingDTO {
    date?: Date;
    daysprev?: number;
    value?: number;
    address?: string;
    obs?: string;
    city?: string;
    state?: string
    postalcode?: string;
    receivedby?: string;
    receivedat?: Date;
    trackingcode?: string;
}

export const Convert = {
    toProductDTO: (product:Product):ProductDTO => {
        return {
            id: product.id || 0,
            idcategory: product.category?.id || 0,
            availabilitystatus: product.availabilityStatus || "",
            barcode: product.meta?.barcode || "",
            brand: product.brand || "",
            createdat: product.meta?.createdAt || undefined,
            depth: product.dimensions?.depth || 0,
            description: product.description || "",
            discountpercentage: product.discountPercentage || 0,
            height: product.dimensions?.height || 0,
            minimumorderquantity: product.minimumOrderQuantity || 0,
            price: product.price || 0,
            qrcode: product.meta?.qrCode || "",
            rating: product.rating || 0,
            returnpolicy: product.returnPolicy || "",
            shippinginformation: product.shippingInformation || "",
            sku: product.sku || "",
            stock: product.stock || 0,
            thumbnail: product.thumbnail || "",
            title: product.title || "",
            updatedat: product.meta?.updatedAt || undefined,
            warrantyinformation: product.warrantyInformation || "",
            weight: product.weight || 0,
            width: product.dimensions?.width
        }
    },
    toProduct: (productDTO:ProductDTO):Product => {
        return {
            id: productDTO.id || 0,
            availabilityStatus: productDTO.availabilitystatus || "",
            brand: productDTO.brand || "",
            category: {
                description: "",
                id: productDTO.idcategory
            },
            description: productDTO.description || "",
            dimensions: {
                depth: productDTO.depth || 0,
                height: productDTO.height || 0,
                width: productDTO.width || 0,                            
            },
            discountPercentage: productDTO.discountpercentage || 0,
            images: [],
            meta:{
                barcode: productDTO.barcode || "",
                createdAt: productDTO.createdat || undefined,
                qrCode: productDTO.qrcode || "",
                updatedAt: productDTO.updatedat || undefined,                
            },
            minimumOrderQuantity: productDTO.minimumorderquantity || 0,
            price: productDTO.price || 0,
            rating: productDTO.rating || 0,
            returnPolicy: productDTO.returnpolicy || "",
            reviews: [],
            shippingInformation: productDTO.shippinginformation || "",
            sku: productDTO.sku || "",
            stock: productDTO.stock || 0,
            tags: "",
            thumbnail: productDTO.thumbnail || "",
            title: productDTO.title || "",
            warrantyInformation: productDTO.warrantyinformation || "",
            weight: productDTO.weight || 0,            
        }
    },
    toOrderDtO: (order:Order):OrderDTO => {
        return {
            id: order.id || 0,
            date: order.date || undefined,
            dtprev: order.dtprev || undefined,
            iduser: order.idUser || 0,
            status: order.status || 'pending',            
        }
    },
    toOrder: (orderDTO:OrderDTO):Order => {
        return {
            id: orderDTO.id || 0,
            date: orderDTO.date || undefined,
            dtprev: orderDTO.dtprev || undefined,
            idUser: orderDTO.iduser || 0,
            payment: undefined,
            products: [],
            shipping: undefined,
            status: orderDTO.status || 'pending'
        }
    },
    toOrderProduct: (orderProductDTO:OrderProductDTO):OrderProduct => {
        return {
            idProduct: orderProductDTO.idproduct || 0,
            price: orderProductDTO.price || 0,
            qtde: orderProductDTO.qtde || 0,
            title: orderProductDTO.title || "",
            discountPercentage: orderProductDTO.discountpercentage || 0,
            thumbnail: orderProductDTO.thumbnail || "",            
        }
    },
    toOrderPayment: (orderPaymentDTO: OrderPaymentDTO):OrderPayment => {
        return {
            date: orderPaymentDTO.date || undefined,
            cardCvv: orderPaymentDTO.cardcvv || 0,
            cardExpire: orderPaymentDTO.cardexpire || "",
            cardHolderDoc: orderPaymentDTO.cardholderdoc || "",
            cardHolderName: orderPaymentDTO.cardholdername || "",
            cardNumber: orderPaymentDTO.cardnumber || "",
            discountPercentage: orderPaymentDTO.discountpercentage || 0,
            parc: orderPaymentDTO.parc || 0,
            paymentMethod: orderPaymentDTO.paymentmethod || "",
            value: orderPaymentDTO.value || 0,
        }
    },
    toOrderShipping: (orderShipptingDTO:OrderShippingDTO):OrderShipping => {
        return {
            address: orderShipptingDTO.address || "",
            city: orderShipptingDTO.city || "",
            date: orderShipptingDTO.date || undefined,
            daysprev: orderShipptingDTO.daysprev || 0,
            obs: orderShipptingDTO.obs || "",
            postalCode: orderShipptingDTO.postalcode || "",
            receivedAt: orderShipptingDTO.receivedat || undefined,
            receivedBy: orderShipptingDTO.receivedby || "",
            state: orderShipptingDTO.state || "",
            value: orderShipptingDTO.value || 0,            
        }
    }
}

export interface CepProps {
    cep:         string;
    logradouro:  string;
    complemento: string;
    unidade:     string;
    bairro:      string;
    localidade:  string;
    uf:          string;
    estado:      string;
    regiao:      string;
    ibge:        string;
    gia:         string;
    ddd:         string;
    siafi:       string;
}

export interface CoordProps {
    lat: number;
    lon: number;
}

export interface Message {
    id?: number,
    createdAt: Date,
    name: string,
    email: string,
    subject: string,
    message: string,    
}

export interface Promocao {
    id?: number,
    title: string,
    banner: string,
    createdAt: Date,
    finalDate: Date,
    products?: Product[],
}
