PROJECTS_FUNCTION = {
    "type":"array",
    "description":"Details of the projects done by the candidate only fill if the input is resume",
    "items":{
        "type":"object",
        "properties":{
            "title":{
                "type":"string",
                "description":"Title of the project"
            },
            "description":{
                "type":"string",
                "description":"Description of the project"
            },
            "tech_stack":{
                "type":"array",
                "description":"Tech Stack used in the project",
                "items":{
                    "type":"string"
                }
            },
            "time_duration":{
                "type":"object",
                "description":"Start and End date of the project",
                "properties":{
                    "start_date":{
                        "type":"string",
                        "description":"Start date of the project in MM/YYYY"
                    },
                    "end_date":{
                        "type":"string",
                        "description":"End date of the project in MM/YYYY"
                    },
                    "duration_months":{
                        "type":"integer",
                        "description":"Duration of the project in months"
                    }
                }
            },
            "relevance":{
                "type":"integer",
                "description":"Relevance of the project in a scale of 1 to 10 to the job description provided by company"
            }
        }
    }
}

PROFESSIONAL_EXPERIENCE_FUNCTION = {
    "type":"array",
    "description":"Details of the professional experiences of the candidate only fill if the input is resume",
    "items":{
        "type":"object",
        "properties":{
            "organization":{
                "type":"string",
                "description":"Name of the organization"
            },
            "role":{
                "type":"string",
                "description":"Role in the organization"
            },
            "tech_stack":{
                "type":"array",
                "description":"Tech Stack used in the project",
                "items":{
                    "type":"string"
                }
            },
            "description":{
                "type":"string",
                "description":"Description of the project"
            },
            "time_duration":{
                "type":"object",
                "description":"Start and End date of the project",
                "properties":{
                    "start_date":{
                        "type":"string",
                        "description":"Start date of the project in MM/YYYY"
                    },
                    "end_date":{
                        "type":"string",
                        "description":"End date of the project in MM/YYYY"
                    },
                    "duration_months":{
                        "type":"integer",
                        "description":"Duration of the project in months"
                    }
                }
            },
            "relevance":{
                "type":"integer",
                "description":"Relevance of the professional experience in a scale of 1 to 10 to the job description provided by company"
            }
        }
    }
}

COLLEGE_FUNCTION = {
    "type": "object",
    "description": "Details of the college of the candidate only fill if the input is resume",
    "properties": {
        "name":{
            "type": "string",
            "description": "Name of the college"
        },
        "degree":{
            "type": "string",
            "description": "Degree Received from the college"
        },
        "branch":{
            "type": "string",
            "description": "Major done during the degree"
        },
        "cgpa":{
            "type":"number",
            "description":"CGPA associated with the degree"
        },
        "start_date":{
            "type": "string",
            "description": "Start date of the degree in MM/YYYY"
        },
        "end_date":{
            "type": "string",
            "description": "End date of the degree in MM/YYYY"
        }
    }
}

PROFILE_FUNCTION = {
    "type": "object",
    "description": "Details of the candidate only fill if the input is resume",
    "properties": {
        "candidate_name":{
            "type": "string",
            "description": "Name of the candidate"
        },
        "email":{
            "type": "string",
            "description": "Email of the candidate"
        }
    }

}

RELEVANCE = {
    "type": "integer",
    "description": "Relevance of the resume to the job description in a scale of 0 to 100 only fill if the input is resume"
}

JSON_FUNCTION = [
    {
        "name": "parse_resume",
        "description": "Parse the resume and return the details of the candidate",
        "parameters": {
            "type": "object",
            "properties": {
                "isResume": {
                    "type": "boolean",
                    "description": "Boolean to check if the input is a resume"
                },
                "profile": PROFILE_FUNCTION,
                "college": COLLEGE_FUNCTION,
                "projects": PROJECTS_FUNCTION,
                "professional_experiences": PROFESSIONAL_EXPERIENCE_FUNCTION,
                "relevance": RELEVANCE,
            }
        },
    }
]