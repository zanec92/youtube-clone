import numeral from 'numeral';
import Axios from "axios";

Vue.component('subscribe-button', {
    props: {
        channel: {
            type: Object,
            required: true,
            default: () => ({})
        },
        subscriptions: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    computed: {
        subscribed() {
            if (! __auth() || this.channel.user_id === __auth().id) return false;
            return !!this.subscription;
        },

        owner() {
            if (__auth() && this.channel.user_id === __auth().id) return true;
        },

        count() {
            return numeral(this.subscriptions.length).format('0a');
        },

        subscription() {
            if (! __auth()) return null;

            return this.subscriptions.find(subscription => subscription.user_id == __auth().id);
        }
    },
    methods: {
        toggleSubscription() {
            if (! __auth()) {
                return alert('Please login to subscribe!');
            }

            if (this.owner) {
                return alert('You cannot subscribe to your channel.');
            }

            if (this.subscribed) {
                axios.delete(`/channels/${this.channel.id}/subscriptions/${this.subscription.id}`);
            } else {
                axios.post(`/channels/${this.channel.id}/subscriptions`);
            }
        }
    }
})
