import query from './postgres'

const criarTabelas = async () => {
    try {
        
        await query(`
            CREATE TABLE if not EXISTS users(
                id BIGSERIAL,
                firstName varchar(50),
                lastName varchar(80),
                email varchar(100),
                phone varchar(15),
                username varchar(100),
                password varchar(100),
                address varchar(200),
                obs     varchar(200),
                city varchar(50),
                state varchar(3),
                postalCode varchar(9),
                cardExpire varchar(5),
                cardNumber varchar(20),
                cardHolderName varchar(100),
                cardHolderDoc varchar(20),
                cardcvv numeric(3) default 0,
                role varchar(20),
                PRIMARY KEY (id)
            )
        `)
    
        await query(`
            CREATE TABLE if not EXISTS categories(
                id SERIAL,
                description varchar(50) not null,
                PRIMARY KEY (id)
            )
        `)
        
        await query(`
            CREATE TABLE if not EXISTS products(
                id SERIAL,        
                title varchar(50),
                description varchar(200),
                idcategory INT default 0,
                price NUMERIC(12,2) default 0,
                discountPercentage NUMERIC(12,2) default 0,
                rating NUMERIC(1) default 0,
                stock NUMERIC(3) default 0,
                brand varchar(50),
                sku varchar(22),
                weight NUMERIC(3) default 0,
                width NUMERIC(3),
                height NUMERIC(3),
                depth NUMERIC(3),
                warrantyInformation varchar(100),
                shippingInformation varchar(100),
                availabilityStatus varchar(20),
                returnPolicy varchar(100),
                minimumOrderQuantity NUMERIC(3) default 0,
                createdAt  Date,
                updatedAt Date,
                barcode varchar(20),
                qrCode varchar(200),            
                thumbnail varchar(999),
                PRIMARY KEY (id),
                FOREIGN KEY(idcategory) REFERENCES categories(id) ON DELETE CASCADE
                )
                `)        
                
            await query(`
                CREATE TABLE if not EXISTS tags(
                    id SERIAL,
                    description varchar(50) not null,
                    idproduct INT default 0,
                    PRIMARY KEY (id),
                    FOREIGN KEY(idproduct) REFERENCES products(id) ON DELETE CASCADE
                )
            `)

                await query(`
            CREATE TABLE if not EXISTS reviews(
                id SERIAL,
                idproduct INT default 0,
                rating NUMERIC(1) default 0,
                comment varchar(200),
                date Date,
                reviewername varchar(100),
                reviewernmail varchar(100),
                PRIMARY KEY (id),
                FOREIGN KEY(idproduct) REFERENCES products(id) ON DELETE CASCADE
            )
        `)
    
        await query(`
            CREATE TABLE if not EXISTS images(
                id SERIAL,
                idproduct INT default 0,
                url varchar(999),
                PRIMARY KEY (id),
                FOREIGN KEY(idproduct) REFERENCES products(id) ON DELETE CASCADE
            )
        `)

        await query(`
            CREATE TABLE if not EXISTS orders(
                id BIGSERIAL,
                iduser BIGINT default 0,
                date DATE,
                dtprev DATE,
                PRIMARY KEY (id),
                FOREIGN KEY(iduser) REFERENCES users(id) ON DELETE CASCADE
            )
        `)
        
        await query(`
            CREATE TABLE if not EXISTS order_products(
                id BIGSERIAL,
                idorder BIGINT default 0,
                idproduct INT default 0,
                qtde INT default 0,
                title varchar(50),
                thumbnail varchar(999), 
                price NUMERIC(12,2) default 0,
                discountPercentage NUMERIC(12,2) default 0,
                PRIMARY KEY (id),
                FOREIGN KEY(idorder) REFERENCES orders(id) ON DELETE CASCADE
            )
        `)
        
        await query(`
            CREATE TABLE if not EXISTS order_payments(
                id BIGSERIAL,
                idorder BIGINT default 0,
                date DATE,
                parc INT default 0,
                value NUMERIC(12,2) default 0,
                discountPercentage NUMERIC(12,2) default 0,
                paymentmethod varchar(50),
                cardExpire varchar(5),
                cardNumber varchar(20),
                cardHolderName varchar(100),
                cardHolderDoc varchar(20),
                cardcvv numeric(3) default 0,
                PRIMARY KEY (id),
                FOREIGN KEY(idorder) REFERENCES orders(id) ON DELETE CASCADE
            )
        `)

        await query(`
            CREATE TABLE if not EXISTS order_shipping(
                id BIGSERIAL,
                idorder BIGINT default 0,
                date DATE,
                daysprev INT,
                value NUMERIC(12,2) default 0,
                address varchar(200),
                obs     varchar(200),
                city varchar(50),
                state varchar(3),
                postalCode varchar(9),
                receivedby varchar(50),
                receivedAt DATE,
                PRIMARY KEY (id),
                FOREIGN KEY(idorder) REFERENCES orders(id) ON DELETE CASCADE
            )
        `)        
        
        //criando indices
        await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_email ON users (email);`)
        await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_descr ON categories (description);`)
        await query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_title ON products (title);`)

        return { data: 'ok' }
    } catch (error) {
        throw { error }
    }
    
    

}

export default criarTabelas