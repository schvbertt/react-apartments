import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()
// <RoomContext.Provider value={}

export default class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,
        homeAlert: true
    }
    // getData

    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))

        this.setState({
            rooms, 
            featuredRooms, 
            sortedRooms: rooms, 
            loading: false,
            price: maxPrice,
            maxPrice: maxPrice,
            maxSize: maxSize
        })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = {...item.fields, images: images, id}
            return room
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room) => room.slug === slug)
        return room
    }

    handleChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' 
        ? target.checked
        : target.value
        const name = e.target.name

        this.setState({
            [name]: value
        }, this.filterRooms)


        
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, 
            price, minSize, maxSize, breakfast, pets
        } = this.state
// ALL THE ROOMS
        let tempRooms = [...rooms]
// TRANSFORM VALUE
        capacity = parseInt(capacity)
        price = parseInt(price)

// FILTER BY TYPE
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
// FILTER BY CAPACITY
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
// FILTER BY PRICE
        tempRooms = tempRooms.filter(room => room.price <= price)
// FILTER BY SIZE
        tempRooms = tempRooms.filter
        (room => room.size >= minSize && room.size <= maxSize)
// FILTER BY BREAKFAST
        if(breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
// FILTER BY BREAKFAST
        if(pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
// CHANGE STATE
        this.setState({
            sortedRooms: tempRooms
        }) 

    }
// HOME ALERT
    handleHomeAlert = () => {
        this.setState({
            homeAlert: false
        })
    }

    render() {
        return (
            <RoomContext.Provider 
            value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange,
                handleHomeAlert: this.handleHomeAlert
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}


const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext}