import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import TimeDropdown from './TimeDropdown'
import { CLOCK_DATA } from '../helpers/data'
import { popInOut } from '../helpers/animations'

export class Time extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.toggleMeridiem = this.toggleMeridiem.bind(this)
		this.hourClick = this.hourClick.bind(this)
		this.minuteClick = this.minuteClick.bind(this)
		this.closeHourSelect = this.closeHourSelect.bind(this)
		this.closeMinuteSelect = this.closeMinuteSelect.bind(this)
	}
	toggleMeridiem() {
		if (this.props.meridiem === 'am') {
			this.props.changeMeridiem('pm')
		} else {
			this.props.changeMeridiem('am')
		}
	}

	hourClick() {
		if (this.props.unit !== 'hour') {
			this.props.changeUnit('hour')
		}
	}
	closeHourSelect() {
		this.setState({ showHourSelect: false })
	}
	minuteClick() {
		if (this.props.unit !== 'minute') {
			this.props.changeUnit('minute')
		}
	}
	closeMinuteSelect() {
		this.setState({ showMinuteSelect: false })
	}

	render() {
		const props = this.props
		const config = props.config
		const styles = {
			wrapper: {
				height: '40px',
				background: config.TIME_BACKGROUND,
				borderRadius: '3px 3px 0 0',
				border: '1px solid #E8ECEF'
			},
			timeWrapper: {
				position: 'relative'
			},
			colon: {
				color: config.TIME_DEFAULT_COLOR,
				fontWeight: '500',
				display: 'inline-block',
				fontSize: '14px',
				verticalAlign: '2px',
				margin: '0 5px',
				lineHeight: 'normal'
			},
			time: {
				color: config.TIME_DEFAULT_COLOR,
				display: 'inline-block',
				fontSize: '14px',
				fontFamily: 'Roboto',
				fontStyle: 'normal',
				fontWeight: 'normal',
				lineHeight: 'normal',
				cursor: 'pointer',
				userSelect: 'none',
				lineHeight: 'normal'
			},
			timeSelected: {
				color: config.TIME_SELECTED_COLOR,
				animation: 'x 0.6s ease-out both',
				animationName: popInOut
			},
			hourWrapper: {
				width: '139.5px',
				height: '40px',
				paddingTop: '9px',
				textAlign: 'center',
				position: 'relative',
				display: 'inline-block',
				borderRight: '1px solid #E8ECEF'
			},
			minuteWrapper: {
				width: '139.5px',
				height: '40px',
				paddingTop: '9px',
				textAlign: 'center',
				position: 'relative',
				display: 'inline-block'
			},
			meridiem: {
				color: config.TIME_DEFAULT_COLOR,
				display: 'inline-block',
				fontSize: '13px',
				textTransform: 'uppercase',
				marginLeft: '2px',
				padding: '10px 8px',
				verticalAlign: '1px',
				fontFamily: config.FONT_FAMILY
			},
			hmText: {
				fontSize: '8px',
				fontFamily: 'Roboto',
				fontStyle: 'normal',
				fontWeight: 'normal',
				lineHeight: 'normal',
				color: config.TIME_DEFAULT_COLOR
			}
		}

		const formattedMinute = ('0' + props.minute).slice(-2)

		return (
			<div style={styles.wrapper}>
				<div style={styles.timeWrapper}>
					<div style={styles.hourWrapper}>
						<span
							className="react-timekeeper__hour-select"
							style={[styles.time, props.unit === 'hour' && styles.timeSelected]}
							onClick={this.hourClick}
						>
							{props.hour < 10 ? '0' + props.hour : props.hour}
							{/* {props.hour}  */}
							<span style={styles.hmText}>HOURS</span>
						</span>

						{this.state.showHourSelect ? (
							<TimeDropdown
								config={props.config}
								type="hour"
								updateVal={props.changeHour}
								val={props.hour}
								options={CLOCK_DATA[props.unit].dropdownOptions}
								close={this.closeHourSelect}
							/>
						) : (
							''
						)}
					</div>
					<div style={styles.minuteWrapper}>
						<span
							className="react-timekeeper__minute-select"
							style={[styles.time, props.unit === 'minute' && styles.timeSelected]}
							onClick={this.minuteClick}
						>
							{formattedMinute}
							<span style={styles.hmText}>MINUTES</span>
						</span>

						{this.state.showMinuteSelect ? (
							<TimeDropdown
								config={props.config}
								type="minute"
								updateVal={props.changeMinute}
								val={props.minute}
								options={CLOCK_DATA[props.unit].dropdownOptions}
								close={this.closeMinuteSelect}
							/>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		)
	}
}

Time.propTypes = {
	config: PropTypes.object.isRequired,
	unit: PropTypes.string.isRequired,
	meridiem: PropTypes.string.isRequired,

	changeUnit: PropTypes.func.isRequired,
	changeMeridiem: PropTypes.func.isRequired
}

export default Radium(Time)
