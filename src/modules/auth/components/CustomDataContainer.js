import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

import { ButtonWithAuthz, CellContentLoader } from 'asab-webui';
import {
	Row, Card, CardHeader, Col,
	CardFooter, CardBody, Button, Label,
	InputGroup, InputGroupAddon, Input,
	ButtonGroup, Form, FormFeedback,
	FormGroup
} from 'reactstrap';

export function CustomDataContainer({app, resources, customData, setCustomData, loading, resource = "authz:superuser", uri}) {
	const { t } = useTranslation();
	const [data, setData] = useState([]);
	const [edit, setEdit] = useState(false);
	const { handleSubmit, formState: { errors, isSubmitting, isDirty }, control, reset, setValue } = useForm({
		defaultValues: {
			customData: [{key: '', value: ''}]
		}
	});
	const { replace, append, remove, fields } = useFieldArray({
		control,
		name: 'customData'
	});
	let SeaCatAuthAPI = app.axiosCreate('seacat_auth');

	useEffect(() => {
		let formattedPrevData = { customData: [customData] }
		setInitialCustomData(formattedPrevData);
		turnObjectToArray(customData);
	}, [customData])

	const setInitialCustomData = (data) => {
		reset(data);
		if (data && data.customData) {
			data?.customData?.map((obj) => {
				Object.keys(obj) && Object.keys(obj).map((key, index) => {
					setValue(`customData[${index}].key`, key);
					setValue(`customData[${index}].value`, obj[key]);
				})
			})
		}
	}

	const turnObjectToArray = (obj) => {
		let modifiedData = [];
		// if object passed does not contain any data, data state returs to initial value
		if (Object.keys(obj).length === 0) {
			setData([{key: '', value: ''}]);
			return;
		}
		Object.keys(obj).map((element) => {
			modifiedData.push({key:[element][0], value: obj[element]});
		});
		setData(modifiedData);
	}
	/*
		prepForRequest is a function used to transform data to appropriate format for SeaCatAuthAPI's put request. useField Array returns data
		in format [{key: 'hello:, value: 'world'}, ... ], whereas the server expects data in { hello: 'world', ... }
	*/
	const prepForRequest = async (info) => {
		let obj = {};
		await Promise.all(info?.customData?.map((el) => {
			if ((el.key != undefined) && (el.key != '') && (el.key != 'undefined')) {
				obj[el.key] = el.value;
			}
		}));
		return obj;
	}

	const onSave = async (data) => {
		// first, transform data to appropirate format for api request and skip pairs with empty key field
		let objToSubmit = await prepForRequest(data);
		try {
			let response = await SeaCatAuthAPI.put(`/${uri.replace(/^\//g, "")}`, {"data": objToSubmit});
			if (response.data.result !== "OK") {
				throw new Error(t("CustomDataContainer|Something went wrong, failed to update data"));
			};
			setCustomData(objToSubmit);
			turnObjectToArray(objToSubmit);
			setEdit(false);
			app.addAlert("success", t("CustomDataContainer|Data updated successfully"));
		} catch (e) {
			app.addAlert("warning", `${t("CustomDataContainer|Something went wrong, failed to update data")}. ${e?.response?.data?.message}`, 30);
			console.error(e);
		}
	}

    return (
		<Card className={`custom-data-card ${edit ? " edit" : ""}`}>
			<CardHeader className="border-bottom">
				<div className="card-header-title">
					<i className="cil-apps pr-2"></i>
					{t("CustomDataContainer|Custom data")}
				</div>
			</CardHeader>

			<Form onSubmit={handleSubmit((values) => {onSave(values)})}>
				<CardBody className="card-body-scroll-sm " >
					{loading ?
						<CellContentLoader cols={2} rows={5} />
						:
						!edit && (data.length === 1) && (data[0].key === '') ?
							<Label className="mb-0">{t('CustomDataContainer|No data')}</Label>
							:
							!edit && <Row className="custom-data-headers">
								<Col sm={"4"} md={edit ? "4" : "3"} ><h6>{t('CustomDataContainer|Name')}</h6></Col>
								<Col sm={"8"} md={edit ? "6" : "9"} ><h6>{t('CustomDataContainer|Value')}</h6></Col>
							</Row>
					}
					{!edit ?
						<>
							{data && data.map((obj) => {
								return (
									<Row className="custom-data-row">
										<Col sm="4" md="3">{obj.key}</Col>
										<Col sm="8" md="9">{obj.value}</Col>
									</Row>
								)
							})}
						</>
						:
						<CustomDataInput
							control={control} // control - Object containing methods for registering components into React Hook Form.
							errors={errors} // errors - Object containing errors in fields which didn't pass regex validation
							fields={fields} // fields - Object containing component's defaultValue and key.
							append={append} // append - Appends input to the end of fields. The input value is registered during this action.
							remove={remove} // remove - Remove input/inputs at particular position, or remove all when no index provided.
							replace={replace} // replace - Replace the entire field array values.
						/>
					}
				</CardBody>

				<CardFooter>
					{edit ?
						<ButtonGroup>
							<Button
								title={isDirty ? t("CustomDataContainer|Save changes") : t("CustomDataContainer|No changes were made")}
								color="primary"
								type="submit"
								disabled={!isDirty || isSubmitting}
								>
								{t("Save")}
							</Button>
							<Button
								title={t("Cancel")}
								color="primary"
								outline
								type="button"
								onClick={() => {
									setInitialCustomData({ customData: [customData] });
									setEdit(false);
								}}
								disabled={isSubmitting}
							>
								{t("Cancel")}
							</Button>
						</ButtonGroup>
					: <ButtonWithAuthz
						title={t("CustomDataContainer|Edit data")}
						color="primary"
						outline
						onClick={() => setEdit(true)}
						resource={resource}
						resources={resources}
						hideOnUnauthorizedAccess={false}
						>
							{t("Edit")}
						</ButtonWithAuthz>
					}
				</CardFooter>
			</Form>
		</Card>
	)
}

// separate method for better code legibility
function CustomDataInput ({control, errors, append, remove, fields, replace}) {
	const { t } = useTranslation();

	return (
		<FormGroup>
			{fields && fields.map((item, idx) => {
				if (fields[idx].key === "undefined") {
					return
				}
				return (
					<InputGroup key={item.id} className="mb-1 custom-data" >
						<div className="custom-data-key" >
							<Controller
								render={({field}) => <Input {...field} invalid={errors.customData?.[idx]?.key}/>}
								name={`customData[${idx}].key`}
								control={control}
								rules={{
									validate: {
										val: value => (/^[a-zA-Z][a-zA-Z0-9_-]{0,126}[a-zA-Z0-9]$|^$/).test(value) || t("CustomDataContainer|Invalid format"),
									}
								}}
							/>
							{errors.customData?.[idx]?.key && <FormFeedback>{errors.customData?.[idx]?.key?.message}</FormFeedback>}
						</div>
						<div className="custom-data-value">
							<Controller
								render={({field}) => <Input {...field} invalid={errors.customData?.[idx]?.value}/>}
								name={`customData[${idx}].value`}
								control={control}
							/>
						</div>
						<InputGroupAddon addonType="append" className="custom-data-remove-button" >
							<Button
								key={idx}
								title={(fields.length === 1) && (fields[0].key === "") ? t("CustomDataContainer|Nothing to remove") : t("CustomDataContainer|Remove input")}
								color="danger"
								outline
								size="sm"
								disabled={(fields.length === 1) && ((fields[0].key === ""))}
								onClick={() => {(fields.length === 1) ? replace({key: '', value: ''}) : remove(idx)}}
							>
								<span className="cil-minus" />
							</Button>
						</InputGroupAddon>
					</InputGroup>
				);
			})}
			<Button
				className="mt-2"
				title={t("CustomDataContainer|Add new input")}
				color="primary"
				outline
				size="sm"
				type="button"
				onClick={() => {
					append({key: '', value: ''});
				}}
			>
				<span className="cil-plus" />
			</Button>
		</FormGroup>
	)
}
