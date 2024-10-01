import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';

const MenuScreen = () => {
  const [showStarters, setShowStarters] = useState(false);
  const [showMains, setShowMains] = useState(false);
  const [showDesserts, setShowDesserts] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<{ name: string; price: string; description: string; image: any }>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleDropdown = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prevState => !prevState);
  };

  const handleSelectItem = (item: { name: string; price: string; description: string; image: any }) => {
    setSelectedItems([...selectedItems, item]);
    const itemPrice = parseFloat(item.price.replace('R', ''));
    setTotalPrice(prevPrice => prevPrice + itemPrice);

    // Show alert message after selecting an item
    Alert.alert('Item Selected', `${item.name} has been added to your selection!`);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...selectedItems];
    const itemPrice = parseFloat(updatedItems[index].price.replace('R', ''));
    setTotalPrice(prevPrice => prevPrice - itemPrice);
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleOrderNow = () => {
    if (selectedItems.length === 0) {
      Alert.alert('No Items', 'Please select items to order.');
    } else {
      Alert.alert('Order Received', 'Your order has been received and it will be ready or delivered to you.');
    }
  };

  const renderDropdown = (items: Array<{ name: string; price: string; description: string; image: any }>) => {
    return (
      <View>
        {items.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleSelectItem(item)}>
            <Image source={item.image} style={styles.menuImage} />
            <View style={styles.menuDetails}>
              <Text style={styles.menuName}>{item.name} - {item.price}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const starters = [
    { name: 'Salad', price: 'R59.99', description: 'Fresh garden salad.', image: require('./images/salad.jpg') },
    { name: 'Soup', price: 'R49.99', description: 'Tomato basil soup.', image: require('./images/soup.jpg') },
    { name: 'Bruschetta', price: 'R69.99', description: 'Grilled bread with tomatoes.', image: require('./images/bruschetta.jpg') },
    { name: 'Spring Rolls', price: 'R79.99', description: 'Crispy vegetable spring rolls.', image: require('./images/rolls.jpg') },
  ];

  const mains = [
    { name: 'Steak', price: 'R149.99', description: 'Grilled rib-eye steak.', image: require('./images/steak.jpg') },
    { name: 'Pasta', price: 'R119.99', description: 'Pasta in creamy Alfredo sauce.', image: require('./images/pasta.jpg') },
    { name: 'Pizza', price: 'R99.99', description: 'Wood-fired Margherita pizza.', image: require('./images/pizza.jpg') },
    { name: 'Burger', price: 'R79.99', description: 'Classic beef burger with fries.', image: require('./images/burger.jpg') },
  ];

  const desserts = [
    { name: 'Cheesecake', price: 'R49.99', description: 'Creamy New York cheesecake.', image: require('./images/cheese.jpg') },
    { name: 'Brownie', price: 'R39.99', description: 'Chocolate fudge brownie.', image: require('./images/brown.jpg')},
    { name: 'Ice Cream', price: 'R29.99', description: 'Vanilla bean ice cream.', image: require('./images/ice.jpg') },
    { name: 'Apple Pie', price: 'R59.99', description: 'Homemade apple pie.', image: require('./images/apple.jpg') },
  ];

  const drinks = [
    { name: 'Coffee', price: 'R29.99', description: 'Hot brewed coffee.', image: require('./images/coffee.jpg') },
    { name: 'Tea', price: 'R19.99', description: 'Green tea with lemon.', image: require('./images/tea.jpg') },
    { name: 'Soda', price: 'R19.99', description: 'Chilled soda with ice.', image: require('./images/soda.jpg') },
    { name: 'Juice', price: 'R29.99', description: 'Fresh orange juice.', image: require('./images/juice.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <TouchableOpacity onPress={() => toggleDropdown(setShowStarters)} style={styles.button}>
        <Text style={styles.buttonText}>Starters</Text>
      </TouchableOpacity>
      {showStarters && renderDropdown(starters)}

      <TouchableOpacity onPress={() => toggleDropdown(setShowMains)} style={styles.button}>
        <Text style={styles.buttonText}>Mains</Text>
      </TouchableOpacity>
      {showMains && renderDropdown(mains)}

      <TouchableOpacity onPress={() => toggleDropdown(setShowDesserts)} style={styles.button}>
        <Text style={styles.buttonText}>Desserts</Text>
      </TouchableOpacity>
      {showDesserts && renderDropdown(desserts)}

      <TouchableOpacity onPress={() => toggleDropdown(setShowDrinks)} style={styles.button}>
        <Text style={styles.buttonText}>Drinks</Text>
      </TouchableOpacity>
      {showDrinks && renderDropdown(drinks)}

      {/* Display selected items with image and description */}
      <View style={styles.selectedItemsContainer}>
        <Text style={styles.totalText}>Selected Items</Text>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Image source={item.image} style={styles.selectedImage} />
            <View style={styles.selectedItemDetails}>
              <Text style={styles.selectedItemText}>{item.name} - {item.price}</Text>
              <Text style={styles.selectedItemDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Display the total price and number of selected items */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Items: {selectedItems.length}</Text>
        <Text style={styles.totalText}>Total Price: R{totalPrice.toFixed(2)}</Text>
      </View>

      {/* Change "Add to Cart" button to "Order Now/Pay Now" */}
      <TouchableOpacity style={styles.orderNowButton} onPress={handleOrderNow}>
        <Text style={styles.orderNowText}>Order Now/Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  menuImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuDescription: {
    fontSize: 14,
    color: 'gray',
  },
  selectedItemsContainer: {
    width: '100%',
    marginTop: 20,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  selectedItemDetails: {
    flex: 1,
  },
  selectedItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderNowButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  orderNowText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MenuScreen;
