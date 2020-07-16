const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => Date.now()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "You must enter an exercise."
                },
                name: {
                    type: String,
                    trim: true,
                    required: "The exercise must have a name."
                },
                duration: {
                    type: Number,
                    required: "Enter the exercise duration in minutes."
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: SVGAnimatedNumber
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    // Allows for use of .virtual, which holds data not storing to MongoDB but which we can still display to the client
    {    
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual("totalDuration").get(function () {
    return this.exercise.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;