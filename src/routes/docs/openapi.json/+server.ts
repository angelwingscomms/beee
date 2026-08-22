import { REG_AMOUNT, DISCOUNT_PCT } from '$lib/constants';

export const prerender = true;

const spec = {
	openapi: '3.1.0',
	info: {
		title: 'BEEE API',
		description:
			'Public REST API for the BEEE Spectacular Chess Championship Abuja 2026. Registration, partner referral codes, payments and account endpoints. Returns JSON.',
		version: '1.0.0',
		contact: { name: 'BEEE', email: 'info@beeeproject.com', url: 'https://beeeproject.com' }
	},
	servers: [{ url: 'https://beeeproject.com/api' }],
	paths: {
		'/banks': {
			get: {
				operationId: 'listBanks',
				summary: 'List Nigerian banks',
				description: 'Returns the Nigerian bank codes used by the registration form.',
				responses: {
					'200': {
						description: 'A list of banks',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										banks: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													n: { type: 'string', description: 'Bank name' },
													c: { type: 'string', description: 'Bank code' }
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		'/validate-partner': {
			post: {
				operationId: 'validatePartnerCode',
				summary: 'Validate a partner code',
				description: `Checks a partner referral code and, if valid, returns the discounted amount (${DISCOUNT_PCT}% off the NGN ${REG_AMOUNT} full fee).`,
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: { code: { type: 'string', description: 'Partner referral code' } },
								required: ['code']
							}
						}
					}
				},
				responses: {
					'200': {
						description: 'Validation result',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										valid: { type: 'boolean' },
										code: { type: 'string', nullable: true },
										amount: { type: 'integer', description: 'Amount in Naira' },
										full_amount: { type: 'integer' }
									}
								}
							}
						}
					},
					'503': {
						description: 'Could not check the code',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: { error: { type: 'string' } }
								}
							}
						}
					}
				}
			}
		},
		'/user/check': {
			get: {
				operationId: 'checkEmail',
				summary: 'Check an email',
				description: 'Returns whether an email is already registered.',
				parameters: [
					{ name: 'email', in: 'query', required: true, schema: { type: 'string', format: 'email' } }
				],
				responses: {
					'200': {
						description: 'Existence check',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: { exists: { type: 'boolean' } }
								}
							}
						}
					}
				}
			}
		},
		'/register': {
			post: {
				operationId: 'createRegistration',
				summary: 'Create a registration',
				description: 'Creates a registration record and returns the registration id and amount.',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									firstName: { type: 'string' },
									lastName: { type: 'string' },
									email: { type: 'string', format: 'email' },
									phone: { type: 'string' },
									school: { type: 'string' },
									password: { type: 'string', description: 'Min 8 characters when no session' },
									partnerCode: { type: 'string', description: 'Optional partner referral code' }
								},
								required: ['firstName', 'lastName', 'email']
							}
						}
					}
				},
				responses: {
					'200': {
						description: 'Registration created',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										success: { type: 'boolean', description: 'Whether the registration was created' },
										registration_id: { type: 'string', description: 'Id of the new registration' },
										amount: { type: 'integer', description: 'Amount due in Naira' }
									}
								}
							}
						}
					},
					'400': {
						description: 'Missing or invalid fields',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: { error: { type: 'string' } }
								}
							}
						}
					}
				}
			}
		},
		'/register-init-payment': {
			post: {
				operationId: 'initRegistrationPayment',
				summary: 'Start a payment',
				description: 'Starts a Paystack payment for a registration and returns the authorization URL.',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: { registrationId: { type: 'string' } },
								required: ['registrationId']
							}
						}
					}
				},
				responses: {
					'200': {
						description: 'Payment initialized',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										success: { type: 'boolean' },
										authorization_url: { type: 'string' },
										access_code: { type: 'string' },
										reference: { type: 'string', description: 'Paystack reference' }
									}
								}
							}
						}
					},
					'404': {
						description: 'Registration not found',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: { error: { type: 'string', description: 'Error message' } }
								}
							}
						}
					}
				}
			}
		},
		'/verify-payment': {
			post: {
				operationId: 'verifyPayment',
				summary: 'Verify a payment',
				description: 'Verifies a Paystack payment and confirms a registration.',
				requestBody: {
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: { reference: { type: 'string' } },
								required: ['reference']
							}
						}
					}
				},
				responses: {
					'200': {
						description: 'Payment verified',
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: {
										success: { type: 'boolean' },
										status: { type: 'string', description: 'Payment status' },
										message: { type: 'string', description: 'Human-readable result' },
										redirect: { type: 'string', description: 'Where to send the payer next' }
									}
								}
							}
						}
					}
				}
			}
		}
	},
	components: {
		securitySchemes: {
			cookieSession: { type: 'apiKey', in: 'cookie', name: 'session', description: 'httpOnly session cookie' }
		}
	}
};

export function GET() {
	return new Response(JSON.stringify(spec, null, 2), {
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
