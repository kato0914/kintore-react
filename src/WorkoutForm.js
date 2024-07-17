import React, { useState, useEffect } from 'react'; // Reactとそのフックをインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeIconコンポーネントをインポート
import {  // FontAwesomeのアイコンをインポート
  faCalendarAlt, // カレンダーアイコン
  faWeightHanging, // 重りアイコン
  faRedo, // リロードアイコン
  faDumbbell, // ダンベルアイコン
  faSave, // 保存アイコン
  faChartLine, // チャートラインアイコン
  faChild, // 子供アイコン
  faUser, // ユーザーアイコン
  faArrowsAltV, // 縦矢印アイコン
  faShoePrints, // 靴の足跡アイコン
  faMale, // 男性アイコン
  faTachometerAlt // タコメーターアイコン
} from '@fortawesome/free-solid-svg-icons';
import './WorkoutForm.css'; // WorkoutFormのスタイルシートをインポート

function WorkoutForm() {
  const [formData, setFormData] = useState({ // フォームデータの状態を管理するuseStateフックを使用
    date: '', // 日付フィールドの初期値
    weight: '', // 重さフィールドの初期値
    reps: '', // 回数フィールドの初期値
    type: '' // 種類フィールドの初期値
  });
  const [response, setResponse] = useState(''); // レスポンスメッセージの状態を管理するuseStateフックを使用

  useEffect(() => { // コンポーネントがマウントされたときに実行されるuseEffectフックを使用
    const savedFormData = JSON.parse(localStorage.getItem('workoutFormData')) || {}; // ローカルストレージから保存されたフォームデータを取得
    const today = new Date().toISOString().split('T')[0]; // 今日の日付を取得し、ISO形式の文字列に変換
    setFormData(prevState => ({ // フォームデータの状態を更新
      ...prevState, // 以前の状態を保持
      ...savedFormData, // 保存されたフォームデータをマージ
      date: today // 日付フィールドを今日の日付に設定
    }));
  }, []);

  useEffect(() => { // フォームデータが変更されたときに実行されるuseEffectフックを使用
    localStorage.setItem('workoutFormData', JSON.stringify(formData)); // フォームデータをローカルストレージに保存
  }, [formData]);

  const handleChange = (e) => { // 入力フィールドが変更されたときに実行される関数を定義
    const { name, value } = e.target; // 入力フィールドの名前と値を取得
    setFormData(prevState => ({ ...prevState, [name]: value })); // フォームデータの状態を更新
  };

  const handleSubmit = async (e) => { // フォームが送信されたときに実行される非同期関数を定義
    e.preventDefault(); // デフォルトのフォーム送信動作を防止
    setResponse(''); // レスポンスメッセージをクリア
    const formDataToSend = new FormData(); // 送信するフォームデータを作成
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key])); // フォームデータをFormDataオブジェクトに追加

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxq60aYPhQXN-IoMGwuSsKUNPAH9FrxhnzzNlQbZliyreFiWvAJPbB_unh2sNtS4g/exec', { // Google Apps ScriptのURLにPOSTリクエストを送信
        method: 'POST', // HTTPメソッドをPOSTに設定
        body: formDataToSend // リクエストボディにフォームデータを設定
      });
      const data = await response.json(); // レスポンスをJSON形式に変換
      setResponse(data.result === "success" ? "デ��タが正常に送信されました。" : `エラーが発生しました: ${data.message}`); // レスポンスメッセージを設定
    } catch (error) {
      setResponse(`エラーが発生しました: ${error.message}`); // エラーメッセージを設定
    }
  };

  const workoutTypes = [ // 筋トレの種類と対応するアイコンの配列を定義
    { name: 'ショルダープレス', icon: faChild }, // ショルダープレスと子供アイコン
    { name: 'チェストプレス', icon: faUser }, // チェストプレスとユーザーアイコン
    { name: 'ラットプルダウン', icon: faArrowsAltV }, // ラットプルダウンと縦矢印アイコン
    { name: 'レッグプレス', icon: faShoePrints }, // レッグプレスと靴の足跡アイコン
    { name: 'アブベンチ', icon: faMale }, // アブベンチと男性アイコン
    { name: 'トレッドミル', icon: faTachometerAlt } // トレッドミルとタコメーターアイコン
  ];

  return ( // コンポーネントのJSXを返す
    <div className="container"> {/* コンテナのdiv要素 */}
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
  ); // JSXの閉じタグを追加
}

export default WorkoutForm; // WorkoutFormコンポーネントをエクスポート