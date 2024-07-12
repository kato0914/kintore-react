import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faWeightHanging, 
  faRedo, 
  faDumbbell, 
  faSave, 
  faChartLine,
  faChild,
  faUser,
  faArrowsAltV,
  faShoePrints,
  faMale,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import './WorkoutForm.css';

// 追加: 日付を当日に更新する関数
document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today; // 日付を当日に設定
    }
});

function WorkoutForm() {
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
    reps: '',
    type: ''
  });
  const [response, setResponse] = useState('');

  useEffect(() => {
    // ローカルストレージから保存された値を読み込む
    const savedFormData = JSON.parse(localStorage.getItem('workoutFormData')) || {};
    
    // 現在の日付を取得
    const today = new Date().toISOString().split('T')[0];
    
    // フォームデータを設定（日付は現在の日付、他のフィールドは保存された値を使用）
    setFormData(prevState => ({
      ...prevState,
      ...savedFormData,
      date: today
    }));

    // コンポーネントのクリーンアップ時にフォームデータを保存
    return () => {
      localStorage.setItem('workoutFormData', JSON.stringify(formData));
    };
  }, []);

  // フォームデータが変更されたときにローカルストレージを更新
  useEffect(() => {
    localStorage.setItem('workoutFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxq60aYPhQXN-IoMGwuSsKUNPAH9FrxhnzzNlQbZliyreFiWvAJPbB_unh2sNtS4g/exec', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      setResponse(data.result === "success" ? "データが正常に送信されました。" : `エラーが発生しました: ${data.message}`);
    } catch (error) {
      setResponse(`エラーが発生しました: ${error.message}`);
    }
  };

  const workoutTypes = [
    { name: 'ショルダープレス', icon: faChild },
    { name: 'チェストプレス', icon: faUser },
    { name: 'ラットプルダウン', icon: faArrowsAltV },
    { name: 'レッグプレス', icon: faShoePrints },
    { name: 'アブベンチ', icon: faMale },
    { name: 'トレッドミル', icon: faTachometerAlt }
  ];

  return (
    <div className="container">
      <h1><FontAwesomeIcon icon={faDumbbell} /> 筋トレ記録・分析アプリ</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FontAwesomeIcon icon={faCalendarAlt} /> 日付:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label><FontAwesomeIcon icon={faWeightHanging} /> 重さ (kg):</label>
          <select name="weight" value={formData.weight} onChange={handleChange} required>
            <option value="" disabled>選択してください</option>
            {[0, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].map(weight => (
              <option key={weight} value={weight}>{weight} kg</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label><FontAwesomeIcon icon={faRedo} /> 回数:</label>
          <select name="reps" value={formData.reps} onChange={handleChange} required>
            <option value="" disabled>選択してください</option>
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(reps => (
              <option key={reps} value={reps}>{reps} 回</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label><FontAwesomeIcon icon={faDumbbell} /> 筋トレの種類:</label>
          <div className="workout-types">
            {workoutTypes.map(type => (
              <label key={type.name} className={formData.type === type.name ? 'selected' : ''}>
                <input
                  type="radio"
                  name="type"
                  value={type.name}
                  checked={formData.type === type.name}
                  onChange={handleChange}
                  required
                />
                <FontAwesomeIcon icon={type.icon} />
                <span>{type.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          <FontAwesomeIcon icon={faSave} /> 記録する
        </button>
      </form>
      
      {response && <div className="response-message">{response}</div>}
      
      <a href="/graph" className="graph-link">
        <FontAwesomeIcon icon={faChartLine} /> 進捗グラフを見る
      </a>
    </div>
  );
}

export default WorkoutForm;