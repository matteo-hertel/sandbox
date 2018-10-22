export default {
  data: {
    todoList: {
      icon: '🗑',
    },
    items: [],
    text: '',
    name: 'Omi',
  },
  rename: function(name) {
    this.data.name = name;
  },
  remove: function(id) {
    if (!this.data.items[id]) return;

    this.data.items.splice(id, 1);
  },
  add: function() {
    if (!this.data.text.trim().length) {
      return;
    }
    this.data.items.push({
      text: this.data.text,
      id: Date.now(),
    });
    this.data.text = '';
  },
  // Default value is false, set to true will update all instances when data changing.
};
