//Survey Show a survey form that allows to add input
import _ from "lodash"
import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form"
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
    {lable :"Survey Title", name: "title"},
    {lable :"Subject line", name: "subject"},
    {lable :"Email body", name: "body"},
    {lable :"Recipient List", name: "emails"}
]

class SurveyForm extends Component {
    renderFields(){
        return _.map(FIELDS, ({lable, name}) => {
            return <Field key={name} component={SurveyField} type="text" lable = {lable} name={name} />
        })
    }

    render() { 
        return (
        <div>
            <form onSubmit = {this.props.handleSubmit(value => console.log(value))}>
                {this.renderFields()}
                <Link to="/surveys" className = "red btn-flat white-text">Cancel</Link>
                <button type="submit" className ="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>            
        </div>  );
    }
}
 
function validate(values){
    const errors = {};

    errors.emails = validateEmails(values.emails || "")

    _.each(FIELDS, ({name})=>{
        if (!values[name]){
            errors[name] = 'You must provide a value'

        }
    })

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);