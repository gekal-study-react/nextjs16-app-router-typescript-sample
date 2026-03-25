import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface NetworkErrorModalProps {
  open: boolean;
  onClose: () => void;
  onRetry?: () => void; // 任意の再試行関数（省略時はリロード）
}

export const NetworkErrorModal: React.FC<NetworkErrorModalProps> = ({ open, onClose, onRetry }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "error.main",
          fontWeight: "bold",
        }}
      >
        <span>⚠️</span> 通信エラーが発生しました
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          ネットワークに接続されていないか、サーバーが応答していません。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          通信環境の良い場所へ移動するか、しばらく経ってから再度お試しください。
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          閉じる
        </Button>
        {onRetry ? (
          <Button onClick={onRetry} variant="contained" color="primary">
            再試行する
          </Button>
        ) : (
          <Button onClick={() => window.location.reload()} variant="contained" color="primary">
            ページを再読み込み
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
